import {Command} from "@event-driven-io/emmett"

export type Score = Command<Score,{
    
	name:string,
	score:number,
	quizId:string    
    
}