import { FormEventHandler, useRef } from "react";

interface Props{
    text: string;
    setText: (value: string)=>void;
}
export function Text({text, setText}: Props){
  const textInput = useRef<HTMLInputElement>(null!);
  const onSubmit: FormEventHandler = e=>{
    e.preventDefault();
    setText(textInput.current.value);
  };
  return (
    <div>
      <div>
      <form onSubmit={onSubmit}>
        <label>入力: <input ref={textInput} placeholder="" size={8} defaultValue="hello" /></label>
        <button type="submit">変更</button>
      </form>
      </div>
      <div style={{border: "1px solid", borderRadius: "4px"}}>
        <span>{text}</span>
      </div>
    </div>
  );    
}
