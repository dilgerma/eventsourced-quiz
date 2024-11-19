'use client'
import {QuizComponent} from "@/app/components/quiz";
import 'bulma/css/bulma.css';
import {Navigation} from "@/app/components/navigation";
import {useState} from "react";
import {DebugEvents} from "@/debug/eventsdebug";
import {AdminQuizConfig} from "@/app/components/admin"; // Import Bulma styles


export default function Page() {

  const [viewMode, setViewMode] = useState<string>("admin")

  return <div>
    <DebugEvents/>
    <div className={"columns"}>

    <div className={"column is-2"}>
      <Navigation setViewMode={(mode)=>setViewMode(mode)}/>
    </div>
    <div className={"column is-8"}>
    {viewMode == "quiz" ? <QuizComponent/> : <span/>}
      {viewMode == "admin" ? <AdminQuizConfig/> : <span/>}
    </div>
  </div>
  </div>
}


