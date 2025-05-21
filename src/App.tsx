import { createContext, PropsWithChildren, useContext } from 'react';
import { Box, Container } from '@mui/material';
import  Grid  from "@mui/material/Grid2";
import './App.css'
import { useSharedModel, useSharedState } from 'madoi-client-react';
import { DrawingCanvas } from './components/model/DrawingCanvas';
import { Whiteboard } from './components/Whiteboard';
import { ChatLogs } from './components/model/ChatLogs';
import { Chat } from './components/Chat';
import { Text } from './components/Text';
import { ASREngine } from './util/ASREngine';
import { madoiKey, madoiUrl } from './keys';
import { Madoi } from 'madoi-client';

const roomId = "madoi-sample-ts-react-showcase-fjnwle3k2qf";
export const Context = createContext({
  asr: new ASREngine(),
  madoi: new Madoi(`${madoiUrl}/${roomId}`, madoiKey)
});


function Desc(props: PropsWithChildren){
  return <div style={{backgroundColor: "#aaccff", borderRadius: "2px"}}><small>
    {props.children}
  </small></div>;
}

export default function App() {
  const ctx = useContext(Context);
  const [text, setText] = useSharedState(ctx.madoi, "hello");
  const logs = useSharedModel(ctx.madoi, ()=>new ChatLogs());
  const dc = useSharedModel(ctx.madoi, ()=>new DrawingCanvas(), false);

  return <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
    <Grid container spacing={2}>  
      <Grid size={{xs:3,md:3}}>
        <Box component="fieldset">
          <legend>Text</legend>
          <Desc>変更ボタンを押すと枠内のテキストが更新されます。</Desc>
          <Text text={text} setText={setText} />
        </Box>
        <Box component="fieldset">
          <legend>Chat</legend>
          <Desc>送信ボタンを押すとチャットメッセージが追加されます。</Desc>
          <Chat asr={ctx.asr} logs={logs} />
        </Box>
      </Grid>
      <Grid size={{xs:9,md:9}}>
        <Box component="fieldset">
          <legend>Whiteboard</legend>
          <Desc>キャンバスへの描画が共有されます。</Desc>
          <Whiteboard canvas={dc} />
          </Box>
      </Grid>
    </Grid>
  </Container>;
}
