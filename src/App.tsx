import { createContext, useContext } from 'react';
import { Box, Container } from '@mui/material';
import  Grid  from "@mui/material/Grid2";
import './App.css'
import { Madoi } from './madoi/madoi';
import { useMadoiObject } from './madoi/reactHelpers';
import { DrawingCanvas } from './madoi/model/DrawingCanvas';
import { Whiteboard } from './madoi/view/Whiteboard';
import { ChatLogs } from './madoi/model/ChatLogs';
import { Chat } from './madoi/view/Chat';

const roomId = "madoi-sample-ts-react-showcase-fjnwlek2qf";
const apikey = "ahfuTep6ooDi7Oa4";
export const MadoiContext = createContext(new Madoi(
  `ws://localhost:8080/madoi/rooms/${roomId}`, apikey
));

export default function App() {
  const madoi = useContext(MadoiContext);
  const logs = useMadoiObject(madoi, ()=>new ChatLogs());
  const dc = useMadoiObject(madoi, ()=>new DrawingCanvas(), false);

  return <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
    <Grid container spacing={2}>                            
      <Grid size={{xs:3,md:3}}>
        <Box component="fieldset">
          <legend>Chat</legend>
          <Chat logs={logs} />
        </Box>
      </Grid>
      <Grid size={{xs:9,md:9}}>
        <Box component="fieldset">
          <legend>Whiteboard</legend>
          <Whiteboard canvas={dc} />
          </Box>
      </Grid>
    </Grid>
  </Container>;
}
