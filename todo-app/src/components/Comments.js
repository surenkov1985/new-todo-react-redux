import "dayjs/locale/en";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { CommentBlock } from "./CommentBlock";

export const Comments = ({ comments, order, pushComments, className }) => {

    const [comment, setComment] = useState()
    const [subComment, setSubComment] = useState(null)
    const getComment = (name, value) => [
        setSubComment(value)
    ]

    useEffect(() => {
        if (subComment) {
           pushComments(comment, subComment);
            
        }
    }, [subComment])

	return (
		<>
			{comments
				.sort((a, b) => b.date - a.date)
				.map((comment) => {
					return (
						<div className={classNames("modal__label", className)} style={{ marginTop: "10px" }} key={comment.id}>
							<CommentBlock data={comment} commHandler={getComment} buttonHandler={setComment}/>
							{comment.subComments && !!comment.subComments.length && (
								<Comments key={comment.id} comments={comment.subComments} pushComments={pushComments} className="subcomment" />
							)}
						</div>
					);
				})}
		</>
	);
};
