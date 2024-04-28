"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const cp = __importStar(require("child_process"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
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
        }
        else {
            vscode.window.showErrorMessage('Please open a ddlbx file to format.');
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map