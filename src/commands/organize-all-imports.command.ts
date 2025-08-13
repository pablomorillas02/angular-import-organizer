import * as vscode from "vscode";
import { WorkspaceProcessorService } from "../services/workspace-processor.service";
import { literals } from "../core/literals";
import { formatString } from "../utils/string.utils";

export class OrganizeAllImportsCommand {
  private readonly workspaceProcessor = new WorkspaceProcessorService();

  constructor() {}

  async execute(): Promise<void> {
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: literals.window.ORGANIZATION_IN_PROGRESS,
        cancellable: false,
      },
      async () => {
        try {
          const result = await this.workspaceProcessor.processWorkspace();

          if (result.failed > 0) {
            vscode.window.showWarningMessage(
              formatString(
                literals.window.ORGANIZATION_PARTIAL_SUCCESS,
                result.processed,
                result.failed
              )
            );
          } else if (result.processed > 0) {
            vscode.window.showInformationMessage(
              formatString(
                literals.window.ORGANIZATION_SUCCESS,
                result.processed
              )
            );
          }
        } catch (error) {
          this.handleError(error);
        }
      }
    );
  }

  private handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    vscode.window.showErrorMessage(`${literals.window.ERROR} ${message}`);
  }
}
