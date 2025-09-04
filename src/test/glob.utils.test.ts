import * as assert from "assert";
import { VALID_TS_FILES, INVALID_TS_FILES } from "../utils/glob.utils";

suite("GlobUtils", () => {
  test("VALID_TS_FILES should be a string pattern containing src", () => {
    assert.strictEqual(typeof VALID_TS_FILES, 'string');
    assert.ok((VALID_TS_FILES as string).includes('src'));
  });

  test("INVALID_TS_FILES should be a string pattern for specs", () => {
    assert.strictEqual(typeof INVALID_TS_FILES, 'string');
    assert.ok((INVALID_TS_FILES as string).includes('.spec.ts'));
  });
});
