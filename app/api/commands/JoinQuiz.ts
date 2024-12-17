import {Command} from "@event-driven-io/emmett"

export type JoinQuiz = Command<JoinQuiz,{
    
	aggregateId:string,
	participantName:string,
	quizId:string    
    
}