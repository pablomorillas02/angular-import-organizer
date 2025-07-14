import * as assert from "assert";
import { ImportParserService } from "../services/import-parser.service";
import { ImportCategory } from "../core/categories";

suite("ImportParserService", () => {
  const parser = new ImportParserService();

  test("should parse valid import statements", () => {
    const content =
      "import { A } from '@angular/core';\nimport { B } from 'rxjs';";
    const imports = parser.parseImports(content);
    assert.strictEqual(imports.length, 2);
    assert.strictEqual(imports[0].path, "@angular/core");
    assert.strictEqual(imports[1].path, "rxjs");
  });

  test("should ignore non-import lines", () => {
    const content = "const x = 1;\nimport { A } from '@angular/core';";
    const imports = parser.parseImports(content);
    assert.strictEqual(imports.length, 1);
    assert.strictEqual(imports[0].path, "@angular/core");
  });

  test("should handle empty content", () => {
    const imports = parser.parseImports("");
    assert.deepStrictEqual(imports, []);
  });

  test("should categorize imports correctly", () => {
    const content =
      "import { A } from '@angular/core';\nimport { B } from './file.service';";
    const imports = parser.parseImports(content);
    assert.strictEqual(imports[0].category, ImportCategory.ANGULAR_CORE);
    assert.strictEqual(imports[1].category, ImportCategory.SERVICES);
  });
});
