import { TypedCustomEventListenerOrObject, TypedCustomEventTarget } from "tcet";

export interface ResultsDetail{
  results: string[];
}
export type ResultsListener = TypedCustomEventListenerOrObject<ASREngine, ResultsDetail>;
export class ASREngine extends TypedCustomEventTarget<ASREngine,
   {results: ResultsDetail, "finished": void}>{
  private recognition: SpeechRecognition ;
  private recognizing = false;
  private lastSize = 0;

  private startTime = 0;

  constructor(private keepEnabled = false, private language = "ja-JP"){
    super();
    const rec = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    this.recognition = rec;
    rec.lang = language;
    rec.continuous = true;
    rec.onresult = e => {
      const results: string[] = [];
      for(let i = this.lastSize; i < e.results.length; i++){
        if(!e.results[i].isFinal) break;
        results.push(e.results[i][0].transcript);
      }
      this.lastSize += results.length;
      if(results.length > 0)
        this.dispatchCustomEvent("results", {results});
    };
    rec.onstart = () => {
      console.info(`音声認識(${this.language})を開始しました.`);
      this.startTime = new Date().getTime();
    };
    rec.onerror = (e: any) =>{
      console.info(`音声認識でエラーが発生しました: ${e.error}`);
      do{
        if(e.error == "no-speech" ) break;
        if((e.error == "aborted" || e.error === "network") &&
            this.keepEnabled && this.startTime &&
            (new Date().getTime() - this.startTime) < 60 * 60 * 1000) break;
        this.recognizing = false;
      } while(false);
    };
    this.recognition.onend = () => {
      console.log("音声認識が終了しました.")
      if(this.keepEnabled){
        console.log("音声認識を再起動します.");
        this.recognition?.start();
      } else{
        this.dispatchCustomEvent("finished");
      }
    };
  }

  isRecognizing(){
    return this.recognizing;
  }

  getLanguage(){
    return this.language;
  }

  setLanguage(language: string){
    this.language = language;
  }

  isKeepEnabled(){
    return this.keepEnabled;
  }

  setKeepEnabled(value: boolean){
    this.keepEnabled = value;
  }

  start(){
    if(this.recognizing) return;
    this.recognition?.start();
    this.recognizing = true;
  }

  stop(){
    if(!this.recognizing) return;
    this.recognition?.stop();
    this.recognizing = false;
  }
}
