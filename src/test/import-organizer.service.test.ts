import * as assert from "assert";
import { ImportOrganizerService } from "../services/import-organizer.service";
import { ImportCategory } from "../core/categories";
import { ImportStatement } from "../models/import.model";

suite("ImportOrganizerService", () => {
  const service = new ImportOrganizerService();

  test("should return empty string for empty input", () => {
    assert.strictEqual(service.organizeImports([]), "");
  });

  test("should group and sort imports by category and path", () => {
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
    assert.ok(result.includes("// Angular Core"));
    assert.ok(result.includes("// Third-party libraries"));
    assert.ok(result.includes("// Services"));
    assert.ok(result.indexOf("Angular Core") < result.indexOf("Third-party"));
    assert.ok(result.indexOf("Third-party") < result.indexOf("Services"));
  });

  test("should handle only unknown category", () => {
    const imports: ImportStatement[] = [
      {
        fullImport: "import { X } from './unknown';",
        path: "./unknown",
        category: ImportCategory.UNKNOWN,
        startIndex: 0,
        endIndex: 32,
      },
    ];
    const result = service.organizeImports(imports);
    assert.ok(result.includes("// Unknown"));
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
    assert.ok(result.includes("// Angular Core"));
    assert.ok(result.includes("import { A } from"));
  });
});
