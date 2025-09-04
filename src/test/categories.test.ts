import * as assert from 'assert';
import { ImportCategory, CATEGORY_HEADERS } from '../core/categories';
import { literals } from '../core/literals';

suite('Categories', () => {
  test('ImportCategory should be numeric enum', () => {
    assert.strictEqual(typeof ImportCategory.ANGULAR_CORE, 'number');
  });

  test('CATEGORY_HEADERS should map categories to literals', () => {
    assert.strictEqual(CATEGORY_HEADERS[ImportCategory.ANGULAR_CORE], literals.categories.ANGULAR_CORE);
    assert.strictEqual(CATEGORY_HEADERS[ImportCategory.UNKNOWN], literals.categories.UNKNOWN);
  });
});
