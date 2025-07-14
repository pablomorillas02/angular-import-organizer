import * as assert from 'assert';
import { RegexUtils } from '../utils/regex.utils';

suite('RegexUtils', () => {
  test('extractImportPath should extract path from valid import', () => {
    const path = RegexUtils.extractImportPath("import { A } from '@angular/core';");
    assert.strictEqual(path, '@angular/core');
  });

  test('extractImportPath should return null for invalid import', () => {
    const path = RegexUtils.extractImportPath("const x = 1;");
    assert.strictEqual(path, null);
  });

  test('findAllImportBlocks should find all import blocks', () => {
    const content = "import { A } from '@angular/core';\nimport { B } from 'rxjs';";
    const blocks = RegexUtils.findAllImportBlocks(content);
    assert.strictEqual(blocks.length, 2);
  });

  test('findAllImportBlocks should return empty array for no imports', () => {
    const content = "const x = 1;";
    const blocks = RegexUtils.findAllImportBlocks(content);
    assert.strictEqual(blocks.length, 0);
  });

  test('isNonTestTsFile should return true for .ts file', () => {
    assert.strictEqual(RegexUtils.isNonTestTsFile('file.ts'), true);
  });

  test('isNonTestTsFile should return false for .spec.ts file', () => {
    assert.strictEqual(RegexUtils.isNonTestTsFile('file.spec.ts'), false);
  });
}); 