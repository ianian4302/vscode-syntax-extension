// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Clang-Format Extension activated');

    let disposable = vscode.commands.registerCommand('ddlbx-extension.format', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === 'ddlbx') {
            const document = editor.document;
            const text = document.getText();
            const clangFormatCmd = 'clang-format -style=file';
            cp.exec(clangFormatCmd, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage('Failed to format C++ code: ${error.message}');
                    return;
                }
                editor.edit(editBuilder => {
                    const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
                    editBuilder.replace(fullRange, stdout);
                });
            });
        } else {
            vscode.window.showErrorMessage('Please open a ddlbx file to format.');
        }
    });

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

