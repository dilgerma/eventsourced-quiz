import {Scorecalculated} from "@/app/api/events/Scorecalculated";
import {Quizended} from "@/app/api/events/Quizended";
import {Questionanswered} from "@/app/api/events/Questionanswered";
import {Quizjoined} from "@/app/api/events/Quizjoined";
import {QuizStarted} from "@/app/api/events/QuizStarted";
import {QuestionAdded} from "@/app/api/events/QuestionAdded";
import {QuizCreated} from "@/app/api/events/QuizCreated";

export type QuizEvents = Scorecalculated | 
Quizended | 
Questionanswered | 
Quizjoined | 
QuizStarted | 
QuestionAdded | 
QuizCreated