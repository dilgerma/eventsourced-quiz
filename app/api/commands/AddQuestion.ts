import {Command} from "@event-driven-io/emmett"

export type AddQuestion = Command<AddQuestion,{
    
	answer:string,
	question:string,
	questionId:string,
	quizId:string    
    
}