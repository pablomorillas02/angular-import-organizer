import * as vscode from "vscode";
import { OrganizeImportsCommand } from "./commands/organize-imports.commands";
import { OrganizeAllImportsCommand } from "./commands/organize-all-imports.command";

export function activate(context: vscode.ExtensionContext): void {
  console.log("angular-import-organizer is active!");

  const organizeCommand = new OrganizeImportsCommand();
  const organizeAllCommand = new OrganizeAllImportsCommand();

  const organizeDisposable = vscode.commands.registerCommand(
    "angular-import-organizer.organize",
    () => organizeCommand.execute()
  );
  const organizeAllDisposable = vscode.commands.registerCommand(
    "angular-import-organizer.organize-all",
    () => organizeAllCommand.execute()
  );

  context.subscriptions.push(organizeDisposable);
  context.subscriptions.push(organizeAllDisposable);
}

export function deactivate(): void {}
