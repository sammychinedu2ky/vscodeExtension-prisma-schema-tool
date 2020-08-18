import * as vscode from 'vscode';
import converter from './converter'

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('Prisma-Schema-Tool.helloWorld', async (e) => {
		vscode.window.withProgress({
			location: 15,
			cancellable: true,
			title: "Converting"
		}, async () => {
			let input = await vscode.workspace.fs.readFile(e)
			let output = await vscode.workspace.fs.writeFile(e, converter(input))
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
