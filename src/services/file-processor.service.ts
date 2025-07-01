import * as vscode from "vscode";
import { ImportParserService } from "./import-parser.service";
import { ImportOrganizerService } from "./import-organizer.service";
import { RegexUtils } from "../utils/regex.utils";
import { literals } from "../core/literals";

export class FileProcessorService {
  constructor(
    private readonly parser = new ImportParserService(),
    private readonly organizer = new ImportOrganizerService()
  ) {}

  async processDocument(document: vscode.TextDocument): Promise<void> {
    if (!RegexUtils.isNonTestTsFile(document.fileName))
      throw Error(literals.services.FILE_NOT_SUPPORTED_ERROR);

    const content = document.getText();
    const imports = this.parser.parseImports(content);

    if (imports.length === 0) return;

    const organizedImportsText = this.organizer.organizeImports(imports);
    const replaceRange = this.calculateReplaceRange(document, content);

    await this.applyChanges(document, replaceRange, organizedImportsText);
  }

  private calculateReplaceRange(
    document: vscode.TextDocument,
    content: string
  ): vscode.Range {
    const matches = RegexUtils.findAllImportBlocks(content);
    const firstMatch = matches[0];
    const lastMatch = matches[matches.length - 1];

    return new vscode.Range(
      document.positionAt(firstMatch.index!),
      document.positionAt(lastMatch.index! + lastMatch[0].length)
    );
  }

  private async applyChanges(
    document: vscode.TextDocument,
    range: vscode.Range,
    newContent: string
  ): Promise<void> {
    const edit = new vscode.WorkspaceEdit();
    edit.replace(document.uri, range, newContent);

    await vscode.workspace.applyEdit(edit);
    await document.save();
  }
}
