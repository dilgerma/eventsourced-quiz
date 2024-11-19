
### Setup

Clone the repoository:
https://github.com/dilgerma/eventsourced-quiz

Run the code generator server

```
docker run -ti -p 3001:3000 -v $PWD:/workspace --name codegen  --rm nebulit/codegen
```

Start the code generator
```
gen
```

You will be asked, what you want to generate. Choose 'sample-generator'

```
?? Which generator? 
  axon 
❯ sample-generator 
  eventcatalog 
```


### Emment

We will be using emmet and it´s datastructures.
https://github.com/event-driven-io/emmett/

```
import { Event, Command } from "@event-driven-io/emmett";
```

### Events

Generate a file for each event in /app/api/events/

```
export type QuizCreated = Event<
    'QuizCreated',
    {
        quizId: string;
        quizTitle: string
    }
>;
```

#### Commands

Generate a file for each command in /app/api/commands/

```
export type CreateQuizCommand = Command<"CreateQuiz", {
    quizId: string,
    quizName: string
}>
```

### Export Types

Generate a file in /app/api/commands/QuizCommands.ts

```
import {QuestionAdded} from "@/app/api/events/QuestionAdded";
import {Questionanswered} from "@/app/api/events/Questionanswered";

export type QuizEvents = QuestionAdded | Questionanswered | ...
```

Generate a file in /app/api/events/QuizEvents.ts

```
import {Scorecalculated} from "@/app/api/events/Scorecalculated";
import {Quizended} from "@/app/api/events/Quizended";
...
export type QuizEvents = Scorecalculated | Quizended | ...
```

Implement the Quiz API for "Create Quiz"
```
 handle(command: QuizCommands) {
        switch (command.type) {
            case 'CreateQuiz' : {
                let quizCreated:QuizCreated =  ...
                findEventStore().appendToStream("QuizAggregate", [
                   quizCreated
                ])}
        }
    },
```

In admin.tsx - fire the CreateQuiz Command for Stream "QuizAggregate"

```
let createQuiz: CreateQuizCommand = {
    type: "CreateQuiz",
    data: {quizId: v4(), quizTitle: currentQuestion}
}
QuizApi.handle(createQuiz)
```

Also in admin.tsx - subscribe to the stream and build a simple projection

```
 useEffect(() => {
        registerEventListener({
            on(streamName: string, events: Event[]) {
                findEventStore().readStream(streamName).then(event => {
                    event?.events.forEach((event) => {
                        switch (event.type) {
                            case 'QuizCreated': {
                                let quizCreated: QuizCreated = event as QuizCreated
                                ....
                            }
                        }
                    })
                })
            }
        })
    })
```