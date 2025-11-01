import { ChangeState, ClassName, Distributed, GetState, SetState } from "madoi-client";

type Log = {name: string, message: string};
@ClassName("Chat")
export class ChatLogs{
    private logs: Log[] = [];

    @Distributed()
    @ChangeState()
    addLog(name: string, message: string){
        this.logs = [...this.logs, {name, message}];
    }

    @GetState()
    getLogs(){
        return this.logs;
    }

    @SetState()
    setLogs(logs: Log[]){
        this.logs = logs;
        console.log("logs", logs);
    }
}
