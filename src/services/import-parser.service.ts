import { ImportStatement } from "../models/import.model";
import { ImportCategory } from "../core/categories";
import { IMPORT_PATTERNS } from "../core/patterns";
import { RegexUtils } from "../utils/regex.utils";
import { literals } from "../core/literals";

export class ImportParserService {
  parseImports(content: string): ImportStatement[] {
    const matches = RegexUtils.findAllImportBlocks(content);
    const uniqueImports = new Map<string, ImportStatement>();

    for (const match of matches) {
      const fullImport = match[0];

      if (this.isImportStatement(fullImport)) {
        const importStatement = this.createImportStatement(
          fullImport,
          match.index!
        );
        if (importStatement) uniqueImports.set(fullImport, importStatement);
      }
    }

    return Array.from(uniqueImports.values());
  }

  private isImportStatement(statement: string): boolean {
    return statement.startsWith(literals.services.STARTS_WITH);
  }

  private createImportStatement(
    fullImport: string,
    startIndex: number
  ): ImportStatement | null {
    const path = RegexUtils.extractImportPath(fullImport);
    if (!path) return null;

    return {
      fullImport,
      path,
      category: this.categorizeImport(path),
      startIndex,
      endIndex: startIndex + fullImport.length,
    };
  }

  private categorizeImport(path: string): ImportCategory {
    for (const [category, pattern] of Object.entries(IMPORT_PATTERNS)) {
      if (pattern.test(path)) return Number(category) as ImportCategory;
    }

    return ImportCategory.UNKNOWN;
  }
}
