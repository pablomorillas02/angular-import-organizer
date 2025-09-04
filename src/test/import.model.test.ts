import * as assert from 'assert';
import { ImportStatement, ImportGroup } from '../models/import.model';
import { ImportCategory } from '../core/categories';

suite('ImportModel', () => {
  test('ImportStatement shape should accept expected fields', () => {
    const stmt: ImportStatement = {
      fullImport: "import { A } from '@angular/core';",
      path: '@angular/core',
      category: ImportCategory.ANGULAR_CORE,
      startIndex: 0,
      endIndex: 32,
    };
    assert.strictEqual(stmt.path, '@angular/core');
    assert.strictEqual(stmt.category, ImportCategory.ANGULAR_CORE);
  });

  test('ImportGroup should group imports by category', () => {
    const group: ImportGroup = { category: ImportCategory.SERVICES, imports: [] };
    assert.strictEqual(group.category, ImportCategory.SERVICES);
    assert.deepStrictEqual(group.imports, []);
  });
});
