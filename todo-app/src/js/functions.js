

export const fileRead = (file, errHandler, dataHandler) => {
	let type = file.type;
	const reader = new FileReader();

	if (type === "text/html" || type === "text/css" || type === "text/javascript") {
		errHandler("Данный формат файлов не поддерживается");
		setTimeout(() => {
			errHandler("");
		}, 1500);
		return;
	}

	type = type.replace(/\/.+/, "");

	if (type === "application" && file.type !== "application/pdf") {
		errHandler("Данный формат файлов не поддерживается");
		setTimeout(() => {
			errHandler("");
		}, 1500);
		return;
	}
	if (type === "text") {
		reader.readAsText(file, "windows-1251");
	} else {
		reader.readAsDataURL(file);
	}

	reader.onload = () => {
		dataHandler({ file: reader.result, fileType: type });
	};
};