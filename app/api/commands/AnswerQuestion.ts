import {Command} from "@event-driven-io/emmett"

export type AnswerQuestion = Command<AnswerQuestion,{
    
	questionId:string,
	name:string,
	givenAnswer:string,
	quizId:string    
    
}