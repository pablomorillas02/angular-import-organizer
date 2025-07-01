import * as vscode from "vscode";
import { FileProcessorService } from "../services/file-processor.service";
import { literals } from "../core/literals";

export class OrganizeImportsCommand {
  constructor(private readonly fileProcessor = new FileProcessorService()) {}

  async execute(): Promise<void> {
    const editor = vscode.window.activeTextEditor;

    if (!this.validateEditor(editor)) return;

    try {
      await this.fileProcessor.processDocument(editor!.document);
      vscode.window.showInformationMessage(literals.window.SUCEESS);
    } catch (error) {
      this.handleError(error);
    }
  }

  private validateEditor(
    editor: vscode.TextEditor | undefined
  ): editor is vscode.TextEditor {
    if (!editor) {
      vscode.window.showErrorMessage(
        literals.window.NO_FILE
      );
      return false;
    }
    return true;
  }

  private handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    vscode.window.showErrorMessage(`${literals.window.ERROR} ${message}`);
  }
}
