import { useEffect, useRef, useState } from "react";
import { GetState, Madoi, SetState, Share, ShareClass } from "./madoi";

@ShareClass({className: "State"})
class State<T>{
  constructor(private state: T){
  }

  @Share()
  updateState(value: T){
    this.state = value;
  }

  @SetState()
  setState(value: T){
    this.state = value;
  }

  @GetState()
  getState(){
    return this.state;
  }
}

export function useMadoiState<T>(madoi: Madoi, factory: ()=>T): [T, (v: T)=>void]{
  const value = useRef<State<T>>(null!);
  const [_state, setState] = useState<any>();

  const rerenderOnStateChange = true;
  useEffect(()=>{
    if(value.current !== null) return;
    const obj = new State(factory()) as any;
    value.current = obj;
    let getStateMethod = null;
    for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
      const cfg = obj[p].madoiMethodConfig_;
      if(!cfg) continue;
      if(cfg["getState"]){
        getStateMethod = obj[p];
      }
    }
    if(getStateMethod == null){
      throw new Error(`${typeof obj} must declare @GetState method.`);
    }
    for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
      const cfg = obj[p].madoiMethodConfig_;
      if(!cfg) continue;
      if(cfg["share"]){
        const shareMethod = obj[p];
        const f = function(){
          shareMethod.apply(obj, arguments);
          if(rerenderOnStateChange) setState(getStateMethod.apply(obj));
        };
        f.madoiMethodConfig_ = cfg;
        obj[p] = f;
      } else if(cfg["setState"]){
        const setStateMethod = obj[p];
        const f = function(){
          setStateMethod.apply(obj, arguments);
          if(rerenderOnStateChange) setState(getStateMethod.apply(obj));
        };
        f.madoiMethodConfig_ = cfg;
        obj[p] = f;
      }
    }
    madoi.register(obj);
    setState(getStateMethod.apply(obj));
  }, []);

  return [value.current?.getState(), (v: T)=>{value.current?.updateState(v)}];
}

export function useMadoiObject<T>(madoi: Madoi, factory: ()=>T, rerenderOnStateChange = true): T | null {
  const value = useRef<T>(null!);
  const [_state, setState] = useState<any>();

  useEffect(()=>{
    if(value.current !== null) return;
    const obj = factory() as any;
    value.current = obj;
    let getStateMethod = null;
    for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
      const cfg = obj[p].madoiMethodConfig_;
      if(!cfg) continue;
      if(cfg["getState"]){
        getStateMethod = obj[p];
      }
    }
    if(getStateMethod == null){
      throw new Error(`${typeof obj} must declare @GetState method.`);
    }
    for(let p of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))){
      const cfg = obj[p].madoiMethodConfig_;
      if(!cfg) continue;
      if(cfg["share"]){
        const shareMethod = obj[p];
        const f = function(){
          shareMethod.apply(obj, arguments);
          if(rerenderOnStateChange) setState(getStateMethod.apply(obj));
        };
        f.madoiMethodConfig_ = cfg;
        obj[p] = f;
      } else if(cfg["setState"]){
        const setStateMethod = obj[p];
        const f = function(){
          setStateMethod.apply(obj, arguments);
          if(rerenderOnStateChange) setState(getStateMethod.apply(obj));
        };
        f.madoiMethodConfig_ = cfg;
        obj[p] = f;
      }
    }
    madoi.register(obj);
    setState(getStateMethod.apply(obj));
  }, []);

  return value.current;
}
