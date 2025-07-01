import * as vscode from "vscode";
import { OrganizeImportsCommand } from "./commands/organize-imports.commands";

export function activate(context: vscode.ExtensionContext): void {
  console.log('angular-import-organizer is active!');

  const organizeCommand = new OrganizeImportsCommand();

  const disposable = vscode.commands.registerCommand(
    "angular-import-organizer.organize",
    () => organizeCommand.execute()
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
