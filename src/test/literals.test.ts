import * as assert from 'assert';
import { literals } from '../core/literals';

suite('Literals', () => {
  test('should contain window messages', () => {
    assert.ok(literals.window.ORGANIZATION_SUCCESS.includes('Organization'));
    assert.ok(typeof literals.window.NO_FILES === 'string');
  });

  test('services should contain expected keys', () => {
    assert.strictEqual(literals.services.FULFILLED, 'fulfilled');
  });
});
