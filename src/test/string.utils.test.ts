import * as assert from 'assert';
import { formatString } from '../utils/string.utils';

suite('StringUtils', () => {
  test('formatString should replace placeholders with args', () => {
    const result = formatString('Hello {0}, you have {1} messages', 'Alice', 5);
    assert.strictEqual(result, 'Hello Alice, you have 5 messages');
  });

  test('formatString should leave unknown placeholders intact', () => {
    const result = formatString('Value {2} is unknown', 'A');
    assert.strictEqual(result, 'Value {2} is unknown');
  });
});
