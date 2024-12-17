import {Event} from "@event-driven-io/emmett"

export type Scorecalculated = Event<"Scorecalculated",{
    
	name:string,
	score:number,
	quizId:string    
    
}>