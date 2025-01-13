import { FormEventHandler, useRef } from "react";
import { ChatLogs } from "../model/ChatLogs";
import { Button, TextField } from "@mui/material";

interface Props{
    logs: ChatLogs | null;
}
export function Chat({logs}: Props){
  const name = useRef<HTMLInputElement>(null!);
  const message = useRef<HTMLInputElement>(null!);
  const onSubmit: FormEventHandler = e=>{
    e.preventDefault();
    const n = name.current?.value.trim();
    const m = message.current?.value.trim();
    if(m.length > 0){
      logs?.addLog(n, m);
      message.current!.value = "";
    }
  };
  return (
    <div style={{height: "100%"}}>
      <div>
      <form onSubmit={onSubmit}>
        <TextField inputRef={name} label="名前" size="small" defaultValue="匿名"></TextField>
        <TextField inputRef={message} focused size="small" placeholder="メッセージ"></TextField>
        <Button type="submit" variant="contained">送信</Button>
      </form>
      </div>
      <div style={{height: "240px", overflow: "auto", border: "1px solid", borderRadius: "4px"}}>
        {(logs?.getLogs() || []).map((l, i)=>
          <div key={i}><span>{l.name}</span>: <span>{l.message}</span></div>
        )}
      </div>
    </div>
  );    
}
