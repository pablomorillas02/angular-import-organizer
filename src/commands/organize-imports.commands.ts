import * as vscode from "vscode";
import { FileProcessorService } from "../services/file-processor.service";

export class OrganizeImportsCommand {
  constructor(private readonly fileProcessor = new FileProcessorService()) {}

  async execute(): Promise<void> {
    const editor = vscode.window.activeTextEditor;

    if (!this.validateEditor(editor)) return;

    const relativePath = vscode.workspace.asRelativePath(editor!.document.uri);
    vscode.window.showInformationMessage(
      `Organizando imports en ${relativePath}...`
    );

    try {
      await this.fileProcessor.processDocument(editor!.document);
      vscode.window.showInformationMessage("¡Imports organizados con éxito!");
    } catch (error) {
      this.handleError(error);
    }
  }

  private validateEditor(
    editor: vscode.TextEditor | undefined
  ): editor is vscode.TextEditor {
    if (!editor) {
      vscode.window.showInformationMessage(
        "No hay un archivo activo para organizar."
      );
      return false;
    }
    return true;
  }

  private handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    vscode.window.showErrorMessage(`Error al organizar imports: ${message}`);
  }
}
