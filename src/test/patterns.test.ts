import * as assert from 'assert';
import { IMPORT_PATTERNS } from '../core/patterns';
import { ImportCategory } from '../core/categories';

suite('Patterns', () => {
  test('should have regex for angular core', () => {
    const re = IMPORT_PATTERNS[ImportCategory.ANGULAR_CORE];
    assert.ok(re instanceof RegExp);
    assert.ok(re.test('@angular/core'));
  });

  test('third party pattern should match rxjs', () => {
    const re = IMPORT_PATTERNS[ImportCategory.THIRD_PARTY];
    assert.ok(re.test('rxjs'));
  });
});
