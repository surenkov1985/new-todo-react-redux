import dayjs from "dayjs";
import "dayjs/locale/en";
import { useState } from "react";
import Button from "./Button";
import { ListCreate } from "./ListCreate";

export const CommentBlock = ({ data, commHandler, buttonHandler }) => {
	const [isReply, setIsReply] = useState(false);
	const [obj, setObj] = useState(data);
	const pushSubComments = (comm, subComm) => {
		commHandler(obj, subComm);

		setIsReply(false);
	};

	const replyCommentHandler = () => {
		buttonHandler(data);
		setIsReply(true);
	}

	return (
		<>
			<div>
				<span>{data.user}</span> - <span className="modal__date">{dayjs(data.date).locale("en").format("YYYY-MM-DD HH:mm")}</span>
			</div>
			<div>{data.text}</div>
			<div>
				<Button classList={[""]} onClick={replyCommentHandler}>reply</Button>
				{isReply && <ListCreate focus={true} pushListHandler={pushSubComments} name="subComments" />}
			</div>
		</>
	);
};
