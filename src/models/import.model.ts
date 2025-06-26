import { ImportCategory } from "../core/categories";

export interface ImportStatement {
  readonly fullImport: string;
  readonly path: string;
  readonly category: ImportCategory;
  readonly startIndex: number;
  readonly endIndex: number;
}

export interface ImportGroup {
  readonly category: ImportCategory;
  readonly imports: ImportStatement[];
}
