import {Command} from "@event-driven-io/emmett"

export type CreateQuiz = Command<CreateQuiz,{
    
	quizTitle:string,
	quizId:string    
    
}