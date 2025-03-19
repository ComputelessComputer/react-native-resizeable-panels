// This file provides type definitions for React components and APIs
// that are used in the react-native-resizable-panels package.

declare module 'react' {
  export type ReactNode = 
    | React.ReactElement
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactNodeArray;
  
  export interface ReactNodeArray extends Array<ReactNode> {}
  
  export type ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> = {
    type: T;
    props: P;
    key: Key | null;
  };
  
  export type JSXElementConstructor<P> = 
    | ((props: P) => ReactElement | null)
    | (new (props: P) => Component<P, any>);
  
  export type Key = string | number;
  
  export type RefCallback<T> = (instance: T | null) => void;
  export type RefObject<T> = { current: T | null };
  export type Ref<T> = RefCallback<T> | RefObject<T> | null;
  
  export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  
  export interface ComponentClass<P = {}, S = {}> {
    new(props: P, context?: any): Component<P, S>;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
  
  export interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
  
  export abstract class Component<P = {}, S = {}> {
    constructor(props: P, context?: any);
    
    state: S;
    props: P;
    context: any;
    refs: {
      [key: string]: any;
    };
    
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
  }
  
  export interface MutableRefObject<T> {
    current: T;
  }
  
  export function createRef<T>(): RefObject<T>;
  export function forwardRef<T, P = {}>(render: (props: P, ref: Ref<T>) => ReactElement | null): FunctionComponent<P & { ref?: Ref<T> }>;
  export function createContext<T>(defaultValue: T): Context<T>;
  
  export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }
  
  export interface Provider<T> {
    (props: { value: T; children?: ReactNode }): ReactElement | null;
  }
  
  export interface Consumer<T> {
    (props: { children: (value: T) => ReactNode }): ReactElement | null;
  }
  
  export function useContext<T>(context: Context<T>): T;
  export function useState<S>(initialState: S | (() => S)): [S, (newState: S | ((prevState: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  export function useRef<T>(initialValue: T): MutableRefObject<T>;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
  export function useImperativeHandle<T, R extends T>(ref: Ref<T>, init: () => R, deps?: ReadonlyArray<any>): void;
}
