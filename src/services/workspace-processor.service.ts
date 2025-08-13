import * as vscode from "vscode";
import { FileProcessorService } from "./file-processor.service";
import { literals } from "../core/literals";
import { INVALID_TS_FILES, VALID_TS_FILES } from "../utils/glob.utils";

export class WorkspaceProcessorService {
  constructor(private readonly fileProcessor = new FileProcessorService()) {}

  async processWorkspace(): Promise<{ processed: number; failed: number }> {
    const files = await vscode.workspace.findFiles(
      VALID_TS_FILES,
      INVALID_TS_FILES
    );

    if (files.length === 0) {
      vscode.window.showInformationMessage(literals.window.NO_FILES);
      return { processed: 0, failed: 0 };
    }

    const results = await Promise.allSettled(
      files.map((uri) => this.processFile(uri))
    );

    let processed = 0;
    let failed = 0;

    results.forEach((result) => {
      result.status === literals.services.FULFILLED ? processed++ : failed++;
    });

    return { processed, failed };
  }

  private async processFile(uri: vscode.Uri): Promise<void> {
    try {
      const document = await vscode.workspace.openTextDocument(uri);
      await this.fileProcessor.processDocument(document);
    } catch (error) {
      return Promise.reject({ uri: uri.fsPath, error });
    }
  }
}
