class Px2rem {
	constructor(_vscode) {
		this.vscode = _vscode;
		this.init();
	}

	init() {
		const vscode = this.vscode;
		const window = this.vscode.window;
		const workspace = this.vscode.workspace;
		let disposable = [];

		workspace.onWillSaveTextDocument(this.updateDoc, this, disposable);

		this.disposable = vscode.Disposable.from(disposable);
	}

	updateDoc(event) {
		const document = event.document;
		if (document.languageId !== 'scss') return;

		let text = document.getText();
		const pattern = / *(\-?\d*\.?\d+)px\b/gm;
		text = text.replace(pattern, ' px2rem($1)');

		this.vscode.window.activeTextEditor.edit(editBuilder => {
			// 从开始到结束，全量替换
			const end = new this.vscode.Position(
				this.vscode.window.activeTextEditor.document.lineCount + 1,
				0
			);

			editBuilder.replace(
				new this.vscode.Range(new this.vscode.Position(0, 0), end),
				text
			);
		});
	}

	dispose() {
		//实现dispose方法
		this.disposable.dispose();
	}
}

module.exports = Px2rem;
