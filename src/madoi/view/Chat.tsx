import { FormEventHandler, useRef } from "react";
import { ChatLogs } from "../model/ChatLogs";

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
    <div>
      <div>
      <form onSubmit={onSubmit}>
        <label>名前: <input ref={name} placeholder="名前" size={4} defaultValue="匿名" /></label>
        <input ref={message} autoFocus placeholder="メッセージ" style={{width: "95%"}} />
        <button type="submit">送信</button>
      </form>
      </div>
      <div style={{height: "360px", overflow: "auto", border: "1px solid", borderRadius: "4px"}}>
        {(logs?.getLogs() || []).map((l, i)=>
          <div key={i}><span>{l.name}</span>: <span>{l.message}</span></div>
        )}
      </div>
    </div>
  );    
}
