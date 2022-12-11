import uniqid from "uniqid";
import dayjs from "dayjs";

export class Comment {
	id = uniqid();
	date = dayjs().valueOf();
	subComments = [];

	constructor(user, text) {
		this.user = user;
		this.text = text;
	}
}

export class Project {
	id = uniqid();
	statuses = [{ text: "Queue" }, { text: "Development" }, { text: "Done" }];
	tasks = [];
	taskCounter = 0;
	priorities = [
		{ text: "High", val: 1 },
		{ text: "Average", val: 2 },
		{ text: "Lower", val: 3 },
	];
	constructor(title) {
		this.title = title;
	}
}

export class Task {
	constructor(title, status, numb, priopity) {
		this.id = uniqid();
		this.date = dayjs().valueOf();
		this.title = title;
		this.status = status;
		this.numb = numb;
		this.priority = priopity;
	}
}

export class CheckItem {
	id = uniqid()
	checked = false
	completed= ""  

	constructor (text) {
		this.text = text;
	}
}
