export class RegexUtils {
  static readonly IMPORT_BLOCK_FINDER: RegExp =
    /(^import(?:.|\n|\r)*?;)|(^\/\/ \d\..*)/gm;
  static readonly IMPORT_PATH_EXTRACTOR: RegExp = /from\s+['"]([^'"]+)['"]/;

  static readonly NON_TEST_TS_FILE_VALIDATOR: RegExp = /(?<!\.spec)\.ts$/;

  static extractImportPath(importStatement: string): string | null {
    const match = importStatement.match(this.IMPORT_PATH_EXTRACTOR);
    return match?.[1] || null;
  }

  static findAllImportBlocks(content: string): RegExpMatchArray[] {
    return [...content.matchAll(this.IMPORT_BLOCK_FINDER)];
  }

  static isNonTestTsFile(filePath: string): boolean {
    return this.NON_TEST_TS_FILE_VALIDATOR.test(filePath);
  }
}
