import { GetState, SetState, Share, ShareClass } from "madoi-client";

type Log = {name: string, message: string};
@ShareClass({className: "Chat"})
export class ChatLogs{
    private logs: Log[] = [];

    @Share()
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
