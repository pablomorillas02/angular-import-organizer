import * as assert from "assert";
import { ImportOrganizerService } from "../services/import-organizer.service";
import { ImportCategory } from "../core/categories";
import { ImportStatement } from "../models/import.model";

suite("ImportOrganizerService", () => {
  const service = new ImportOrganizerService();

  test("should return empty string for empty input", () => {
    assert.strictEqual(service.organizeImports([]), "");
  });

  test("should handle single import", () => {
    const imports: ImportStatement[] = [
      {
        fullImport: "import { A } from '@angular/core';",
        path: "@angular/core",
        category: ImportCategory.ANGULAR_CORE,
        startIndex: 0,
        endIndex: 32,
      },
    ];
    const result = service.organizeImports(imports);
    assert.ok(result.includes("import { A } from"));
  });

  test("should group and sort imports by category and path without headers", () => {
    const imports: ImportStatement[] = [
      {
        fullImport: "import { B } from 'rxjs';",
        path: "rxjs",
        category: ImportCategory.THIRD_PARTY,
        startIndex: 0,
        endIndex: 28,
      },
      {
        fullImport: "import { A } from '@angular/core';",
        path: "@angular/core",
        category: ImportCategory.ANGULAR_CORE,
        startIndex: 29,
        endIndex: 61,
      },
      {
        fullImport: "import { C } from './app.service';",
        path: "./app.service",
        category: ImportCategory.SERVICES,
        startIndex: 62,
        endIndex: 95,
      },
    ];

    const result = service.organizeImports(imports);

    // Expect three groups separated by a blank line
    const groups = result.split('\n\n').map((g) => g.trim());
    assert.strictEqual(groups.length, 3);

    // First group should be ANGULAR_CORE imports (category 1)
    assert.ok(groups[0].includes("@angular/core"));

    // Second group should be THIRD_PARTY
    assert.ok(groups[1].includes("rxjs"));

    // Third group should be SERVICES
    assert.ok(groups[2].includes("./app.service"));
  });

  test("should sort imports within a group by path", () => {
    const imports: ImportStatement[] = [
      {
        fullImport: "import { Z } from './b.service';",
        path: "./b.service",
        category: ImportCategory.SERVICES,
        startIndex: 0,
        endIndex: 28,
      },
      {
        fullImport: "import { Y } from './a.service';",
        path: "./a.service",
        category: ImportCategory.SERVICES,
        startIndex: 29,
        endIndex: 61,
      },
    ];

    const result = service.organizeImports(imports);
    const lines = result.split('\n').map((l) => l.trim());
    // Within the same group, a.service should come before b.service
    const idxA = lines.findIndex((l) => l.includes("a.service"));
    const idxB = lines.findIndex((l) => l.includes("b.service"));
    assert.ok(idxA >= 0 && idxB >= 0 && idxA < idxB);
  });
});
