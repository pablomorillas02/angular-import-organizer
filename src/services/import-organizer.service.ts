import { ImportStatement, ImportGroup } from "../models/import.model";
import { ImportCategory, CATEGORY_HEADERS } from "../core/categories";

export class ImportOrganizerService {
  organizeImports(imports: ImportStatement[]): string {
    if (imports.length === 0) return "";

    const sortedImports = this.sortImports(imports);
    const groupedImports = this.groupImportsByCategory(sortedImports);

    return this.formatGroupedImports(groupedImports);
  }

  private sortImports(imports: ImportStatement[]): ImportStatement[] {
    return imports.sort((a, b) => {
      return a.category !== b.category
        ? a.category - b.category
        : a.path.localeCompare(b.path);
    });
  }

  private groupImportsByCategory(imports: ImportStatement[]): ImportGroup[] {
    const groups = new Map<ImportCategory, ImportStatement[]>();

    imports.forEach((importItem) => {
      const existing = groups.get(importItem.category) || [];
      existing.push(importItem);
      groups.set(importItem.category, existing);
    });

    return Array.from(groups.entries())
      .map(([category, imports]) => ({ category, imports }))
      .sort((a, b) => a.category - b.category);
  }

  private formatGroupedImports(groups: ImportGroup[]): string {
    return groups
      .filter((group) => group.imports.length > 0)
      .map((group) => this.formatImportGroup(group))
      .join("\n\n");
  }

  private formatImportGroup(group: ImportGroup): string {
    const header = CATEGORY_HEADERS[group.category];
    const imports = group.imports.map((imp) => imp.fullImport).join("\n");

    return header ? `${header}\n${imports}` : imports;
  }
}
