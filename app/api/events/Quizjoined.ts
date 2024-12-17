import {Event} from "@event-driven-io/emmett"

export type Quizjoined = Event<"Quizjoined",{
    
	aggregateId:string,
	participantName:string,
	quizId:string    
    
}>