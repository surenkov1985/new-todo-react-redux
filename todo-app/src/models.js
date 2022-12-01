import uniqid from "uniqid"
import dayjs from "dayjs" 

export class Comment {
    

    constructor(user, text) {
        this.id = uniqid()
        this.subComments = []
        this.user = user
        this.text = text
        this.date = dayjs().valueOf();
    }

    pushComment(comment) {
        this.subComments = [...this.subComments, comment]
    }
}