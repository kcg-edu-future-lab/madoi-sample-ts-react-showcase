# Madoi sample application with Typescript and React

[Madoi](https://github.com/kcg-edu-future-lab/madoi)を[React](https://ja.react.dev/)を使用したサンプルアプリです。

useMadoiStateフックおよびuseMadoiObjectフックを導入([reactHelopers.ts](https://github.com/kcg-edu-future-lab/madoi-sample-ts-react-showcase/blob/main/src/madoi/reactHelpers.ts)で定義)しており、これにより、簡潔な記述で共有状態や共有オブジェクトを作成できます。

言語は[TypeScript](https://www.typescriptlang.org/), ビルドツールには[Vite](https://ja.vite.dev/)(react-swc)を使用しています。

共有テキスト、チャット、ホワイトボードが実装されています。

<img width="906" alt="image" src="https://github.com/user-attachments/assets/266c5da7-c237-4b1e-8920-bd7884c39e88" />


## useMadoiStateフック

共有状態を作成するフックです。useStateと同様、最新の状態と状態変更関数を返します。状態変更関数を実行すると、実行通知がサーバに送信され、サーバから全てのブラウザに送信されます。実行通知を受信すると、コンポーネントの再レンダリングが行われます。

以下は、ローカルに起動させたMadoiサーバを利用して、useMadoiStateによる状態共有を行う例です。文字列を共有し、その文字列と変更のためのフォームを表示しています。

```tsx
const roomId = "MadoiRoomID";
const apikey = "YourAPIKey";
export const MadoiContext = createContext(new Madoi(
  `ws://localhost:8080/madoi/rooms/${roomId}`, apikey
));
export function Text(){
  const madoi = useContext(MadoiContext);
  const [text, setText] = useMadoiState(madoi, ()=>"");
  const textInput = useRef<HTMLInputElement>(null!);
  const onSubmit: FormEventHandler = e=>{
    e.preventDefault();
    setText(textInput.current.value);
  };
  return (
    <div>
      <div>
      <form onSubmit={onSubmit}>
        <label>入力: <input ref={textInput} defaultValue="hello" /></label>
        <button type="submit">変更</button>
      </form>
      </div>
      <div>
        <span>{text}</span>
      </div>
    </div>
  );    
}
```

## useMadoiObjectフック

共有オブジェクトを作成するフックです。Madoiにおける共有オブジェクトは、Madoiのアノテーション(@SharClass, @GetState, @SetState, @Share)が適切に付与されたクラスから作成されるオブジェクトです。@Shareが付与されたメソッドが実行されると、実行通知がサーバに送信され、サーバから全てのブラウザに送信されます。実行通知を受信すると、実際にメソッドが実行され、その後コンポーネントの再レンダリングが行われます。

```tsx
const roomId = "MadoiRoomID";
const apikey = "YourAPIKey";
export const MadoiContext = createContext(new Madoi(
  `ws://localhost:8080/madoi/rooms/${roomId}`, apikey
));

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
    }
}

function Chat(){
  const madoi = useContext(MadoiContext);
  const logs = useMadoiObject(madoi, ()=>new ChatLogs());
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
        <label>名前: <input ref={name} placeholder="名前" defaultValue="匿名" /></label>
        <input ref={message} autoFocus placeholder="メッセージ" />
        <button type="submit">送信</button>
      </form>
      </div>
      <div>
        {(logs?.getLogs() || []).map((l, i)=>
          <div key={i}><span>{l.name}</span>: <span>{l.message}</span></div>
        )}
      </div>
    </div>
  );    
}
```