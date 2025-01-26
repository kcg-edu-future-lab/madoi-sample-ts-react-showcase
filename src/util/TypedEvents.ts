/**
 * currentTargetの型を指定できるCustomEvent。
 * currentTargetの型は、TypedEventTargetを継承している必要がある。
 */
export interface TypedCustomEvent<T extends TypedEventTarget<T>, D = any>
extends CustomEvent<D>{
    currentTarget: T;
    detail: D;
}

/**
 * TypedCustomEventを受け取るイベントリスナの型エイリアス。
 */
export type TypedEventListener<T extends TypedEventTarget<T>, D = any>
    = (evt: TypedCustomEvent<T, D>) => void;

/**
 * TypedCustomEventを受け取るイベントリスナオブジェクト。
 */
export interface TypedEventListenerObject<T extends TypedEventTarget<T>, D = any>
extends EventListenerObject{
    handleEvent(object: TypedCustomEvent<T, D>): void;
}
/**
 * TypedCustomEventを受け取るイベントリスナ又はオブジェクト。
 */
export type TypedEventListenerOrEventListenerObject<T extends TypedEventTarget<T>, D = any> =
    | TypedEventListener<T, D>
    | TypedEventListenerObject<T, D>;

/**
 * TypedEventを利用するEventTargetの継承元クラス。
 * これを継承して各種イベントリスナやその登録(on)、削除(off)、発火(fire)メソッドを定義する。
 */
export class TypedEventTarget<T extends TypedEventTarget<T>, D = any>
extends EventTarget{
    on(type: string,
            callback: TypedEventListenerOrEventListenerObject<T, D> | null,
            options?: AddEventListenerOptions | boolean){
        this.addEventListener(type, callback as EventListener, options);
    }

    off(type: string,
            callback: TypedEventListenerOrEventListenerObject<T, D> | null,
            options?: boolean | EventListenerOptions){
        this.removeEventListener(type, callback as EventListener, options);
    }

    fire(type: string, detail: any){
        this.dispatchEvent(new CustomEvent(type, {detail}));
    }
}

/**
 * 一種類のイベント通知を行うクラスの基底クラス。
 */
export interface TypedEventTarget1<T extends TypedEventTarget1<T, N, D>, N extends string, D = undefined>
{
    on(type: N, callback: TypedEventListenerOrEventListenerObject<T, D> | null,
        options?: AddEventListenerOptions | boolean): void;
    off(type: N, callback: TypedEventListenerOrEventListenerObject<T, D> | null,
        options?: boolean | EventListenerOptions): void;
    fire(type: N, detail?: D): void;
}
export class TypedEventTarget1<T extends TypedEventTarget1<T, N, D>, N extends string, D = undefined>
extends TypedEventTarget<T>{
}

/**
 * 二種類のイベント通知を行うクラスの基底クラス。
 */
export interface TypedEventTarget2<T extends TypedEventTarget2<T, N1, D1, N2, D2>,
    N1 extends string, D1, N2 extends string, D2>
{
    on(type: N1, callback: TypedEventListenerOrEventListenerObject<T, D1> | null,
        options?: AddEventListenerOptions | boolean): void;
    on(type: N2, callback: TypedEventListenerOrEventListenerObject<T, D2> | null,
        options?: AddEventListenerOptions | boolean): void;
    off(type: N1, callback: TypedEventListenerOrEventListenerObject<T, D1> | null,
        options?: boolean | EventListenerOptions): void;
    off(type: N2, callback: TypedEventListenerOrEventListenerObject<T, D2> | null,
        options?: boolean | EventListenerOptions): void;
    fire(type: N1, detail?: D1): void;
    fire(type: N2, detail?: D2): void;
}
export class TypedEventTarget2<T extends TypedEventTarget2<T, N1, D1, N2, D2>,
    N1 extends string, D1, N2 extends string, D2>
extends TypedEventTarget<T>{
}

/**
 * 三種類のイベント通知を行うクラスの基底クラス。
 */
export interface TypedEventTarget3<T extends TypedEventTarget3<T, N1, D1, N2, D2, N3, D3>,
N1 extends string, D1, N2 extends string, D2, N3 extends string, D3>{
    on(type: N1, callback: TypedEventListenerOrEventListenerObject<T, D1> | null,
        options?: AddEventListenerOptions | boolean): void;
    on(type: N2, callback: TypedEventListenerOrEventListenerObject<T, D2> | null,
        options?: AddEventListenerOptions | boolean): void;
    on(type: N3, callback: TypedEventListenerOrEventListenerObject<T, D3> | null,
        options?: AddEventListenerOptions | boolean): void;
    off(type: N1, callback: TypedEventListenerOrEventListenerObject<T, D1> | null,
        options?: boolean | EventListenerOptions): void;
    off(type: N2, callback: TypedEventListenerOrEventListenerObject<T, D2> | null,
        options?: boolean | EventListenerOptions): void;
    off(type: N3, callback: TypedEventListenerOrEventListenerObject<T, D3> | null,
        options?: boolean | EventListenerOptions): void;
    fire(type: N1, detail?: D1): void;
    fire(type: N2, detail?: D2): void;
    fire(type: N3, detail?: D3): void;
}
export class TypedEventTarget3<T extends TypedEventTarget3<T, N1, D1, N2, D2, N3, D3>,
    N1 extends string, D1, N2 extends string, D2, N3 extends string, D3>
extends TypedEventTarget<T>{
}
