import React, { createContext, PropsWithChildren, useContext } from 'react';
import { Box, Container } from '@mui/material';
import  Grid  from "@mui/material/Grid2";
import './App.css'
import { Madoi } from './madoi/madoi';
import { useMadoiObject, useMadoiState } from './madoi/reactHelpers';
import { DrawingCanvas } from './madoi/model/DrawingCanvas';
import { Whiteboard } from './madoi/view/Whiteboard';
import { ChatLogs } from './madoi/model/ChatLogs';
import { Chat } from './madoi/view/Chat';
import { Text } from './madoi/view/Text';

const roomId = "madoi-sample-ts-react-showcase-fjnwle3k2qf";
const apikey = "ahfuTep6ooDi7Oa4";
export const MadoiContext = createContext(new Madoi(
  `ws://localhost:8080/madoi/rooms/${roomId}`, apikey
));

function Desc(props: PropsWithChildren){
  return <div style={{backgroundColor: "#aaccff", borderRadius: "2px"}}><small>
    {props.children}
  </small></div>;
}

export default function App() {
  const madoi = useContext(MadoiContext);
  const [text, setText] = useMadoiState(madoi, ()=>"hello");
  const logs = useMadoiObject(madoi, ()=>new ChatLogs());
  const dc = useMadoiObject(madoi, ()=>new DrawingCanvas(), false);

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
          <Chat logs={logs} />
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
