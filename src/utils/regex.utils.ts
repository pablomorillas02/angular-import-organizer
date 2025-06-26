export class RegexUtils {
  static readonly IMPORT_BLOCK_FINDER =
    /(^import(?:.|\n|\r)*?;)|(^\/\/ \d\..*)/gm;
  static readonly IMPORT_PATH_EXTRACTOR = /from\s+['"]([^'"]+)['"]/;

  static extractImportPath(importStatement: string): string | null {
    const match = importStatement.match(this.IMPORT_PATH_EXTRACTOR);
    return match?.[1] || null;
  }

  static findAllImportBlocks(content: string): RegExpMatchArray[] {
    return [...content.matchAll(this.IMPORT_BLOCK_FINDER)];
  }
}
