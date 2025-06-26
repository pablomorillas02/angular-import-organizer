import * as vscode from "vscode";
import { FileProcessorService } from "../services/file-processor.service";

export class OrganizeImportsCommand {
  constructor(private readonly fileProcessor = new FileProcessorService()) {}

  async execute(): Promise<void> {
    const editor = vscode.window.activeTextEditor;

    if (!this.validateEditor(editor)) return;

    try {
      await this.fileProcessor.processDocument(editor!.document);
      vscode.window.showInformationMessage("¡Imports organized successfully!");
    } catch (error) {
      this.handleError(error);
    }
  }

  private validateEditor(
    editor: vscode.TextEditor | undefined
  ): editor is vscode.TextEditor {
    if (!editor) {
      vscode.window.showErrorMessage(
        "There is no file to organize..."
      );
      return false;
    }
    return true;
  }

  private handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    vscode.window.showErrorMessage(`Error while organizing imports: ${message}`);
  }
}
