import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from "react";
import { ChatLogs } from "../model/ChatLogs";
import { ASREngine, ASRResult } from "../../util/ASREngine";
import { TypedCustomEvent } from "../madoi";

interface Props{
  asr: ASREngine;
  logs: ChatLogs;
}
export function Chat({asr, logs}: Props){
  const name = useRef<HTMLInputElement>(null!);
  const message = useRef<HTMLInputElement>(null!);
  const [asrEnabled, setAsrEnabled] = useState(false);

  const onSubmit: FormEventHandler = e=>{
    e.preventDefault();
    const n = name.current.value.trim();
    const m = message.current.value.trim();
    if(m.length > 0){
      logs.addLog(n, m);
      message.current!.value = "";
    }
  };
  const onAsrCheckboxChange: ChangeEventHandler<HTMLInputElement> = e=>{
    const enabled = e.currentTarget.checked;
    setAsrEnabled(enabled);
    if(enabled) asr.start();
    else asr.stop();
  };
  const onAsrResults = ({detail: {results}}: TypedCustomEvent<ASREngine, ASRResult>)=>{
    const n = name.current.value.trim();
    const message = results.join("\n");
    if(message.length == results.length - 1) return;
    logs.addLog(n + "[音声認識]", message);
  };
  const onAsrFinished = ()=>{
    setAsrEnabled(false);
  };

  useEffect(()=>{
    asr.on("results", onAsrResults);
    asr.on("finished", onAsrFinished);
    return ()=>{
      asr.off("finished", onAsrFinished);
      asr.off("results", onAsrResults);
    //  asr.clearAllListeners(); // viteでhot update時にcleanupが十分な回数呼ばれない問題への対処。
    };
  }, []);

  return (
    <div>
      <div>
      <form onSubmit={onSubmit}>
        <label>名前: <input ref={name} placeholder="名前" size={4} defaultValue="匿名" /></label>
        <input ref={message} autoFocus placeholder="メッセージ" style={{width: "95%"}} />
        <button type="submit">送信</button>
        <label><input type="checkbox"
          defaultChecked={asrEnabled} onChange={onAsrCheckboxChange}/>音声認識</label>
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
