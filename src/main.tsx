import { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Madoi } from './madoi/madoi.ts';
import { ASREngine } from './util/ASREngine.ts';

export const ASREngineContext = createContext(new ASREngine());

const roomId = "madoi-sample-ts-react-showcase-fjnwle3k2qf";
const apikey = "ahfuTep6ooDi7Oa4";
export const MadoiContext = createContext(new Madoi(
  `ws://localhost:8080/madoi/rooms/${roomId}`, apikey
));

createRoot(document.getElementById('root')!).render(
//  <StrictMode>  // useEffectのcleanupが正常に実行されないためコメントアウト
    <App />
//  </StrictMode>,
)
