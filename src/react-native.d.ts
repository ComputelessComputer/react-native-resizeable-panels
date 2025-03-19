// This file provides type definitions for React Native components and APIs
// that are used in the react-native-resizable-panels package.

declare module 'react-native' {
  import * as React from 'react';

  export type StyleProp<T> = T | Array<StyleProp<T>> | null | undefined;
  
  export interface ViewStyle {
    backfaceVisibility?: 'visible' | 'hidden';
    backgroundColor?: string;
    borderBottomColor?: string;
    borderBottomEndRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomStartRadius?: number;
    borderBottomWidth?: number;
    borderColor?: string;
    borderEndColor?: string;
    borderEndWidth?: number;
    borderLeftColor?: string;
    borderLeftWidth?: number;
    borderRadius?: number;
    borderRightColor?: string;
    borderRightWidth?: number;
    borderStartColor?: string;
    borderStartWidth?: number;
    borderStyle?: 'solid' | 'dotted' | 'dashed';
    borderTopColor?: string;
    borderTopEndRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderTopStartRadius?: number;
    borderTopWidth?: number;
    borderWidth?: number;
    opacity?: number;
    elevation?: number;
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    aspectRatio?: number;
    bottom?: number | string;
    display?: 'none' | 'flex';
    end?: number | string;
    flex?: number;
    flexBasis?: number | string;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    flexGrow?: number;
    flexShrink?: number;
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    height?: number | string;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    left?: number | string;
    margin?: number | string;
    marginBottom?: number | string;
    marginEnd?: number | string;
    marginHorizontal?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginStart?: number | string;
    marginTop?: number | string;
    marginVertical?: number | string;
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    overflow?: 'visible' | 'hidden' | 'scroll';
    padding?: number | string;
    paddingBottom?: number | string;
    paddingEnd?: number | string;
    paddingHorizontal?: number | string;
    paddingLeft?: number | string;
    paddingRight?: number | string;
    paddingStart?: number | string;
    paddingTop?: number | string;
    paddingVertical?: number | string;
    position?: 'absolute' | 'relative';
    right?: number | string;
    start?: number | string;
    top?: number | string;
    width?: number | string;
    zIndex?: number;
    direction?: 'inherit' | 'ltr' | 'rtl';
  }

  export interface ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    onLayout?: (event: LayoutChangeEvent) => void;
    hitSlop?: {
      top?: number;
      left?: number;
      bottom?: number;
      right?: number;
    };
  }

  export class View extends React.Component<ViewProps> {}

  export interface StyleSheetStatic {
    create<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(styles: T | StyleSheet.NamedStyles<T>): T;
  }

  export interface LayoutChangeEvent {
    nativeEvent: {
      layout: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
    };
  }

  export interface PanResponderCallbacks {
    onStartShouldSetPanResponder?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onMoveShouldSetPanResponder?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onStartShouldSetPanResponderCapture?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onMoveShouldSetPanResponderCapture?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onPanResponderGrant?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderMove?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderRelease?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderTerminate?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onPanResponderTerminationRequest?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean;
    onShouldBlockNativeResponder?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean;
  }

  export interface PanResponderInstance {
    panHandlers: GestureResponderHandlers;
  }

  export interface PanResponderStatic {
    create(config: PanResponderCallbacks): PanResponderInstance;
  }

  export interface GestureResponderEvent {
    nativeEvent: {
      changedTouches: NativeTouchEvent[];
      identifier: string;
      locationX: number;
      locationY: number;
      pageX: number;
      pageY: number;
      target: number;
      timestamp: number;
      touches: NativeTouchEvent[];
    };
  }

  export interface NativeTouchEvent {
    identifier: string;
    locationX: number;
    locationY: number;
    pageX: number;
    pageY: number;
    target: number;
    timestamp: number;
    touches: NativeTouchEvent[];
  }

  export interface PanResponderGestureState {
    dx: number;
    dy: number;
    moveX: number;
    moveY: number;
    numberActiveTouches: number;
    stateID: number;
    vx: number;
    vy: number;
    x0: number;
    y0: number;
  }

  export interface GestureResponderHandlers {
    onStartShouldSetResponder?: (e: GestureResponderEvent) => boolean;
    onMoveShouldSetResponder?: (e: GestureResponderEvent) => boolean;
    onResponderGrant?: (e: GestureResponderEvent) => void;
    onResponderReject?: (e: GestureResponderEvent) => void;
    onResponderMove?: (e: GestureResponderEvent) => void;
    onResponderRelease?: (e: GestureResponderEvent) => void;
    onResponderTerminationRequest?: (e: GestureResponderEvent) => boolean;
    onResponderTerminate?: (e: GestureResponderEvent) => void;
    onStartShouldSetResponderCapture?: (e: GestureResponderEvent) => boolean;
    onMoveShouldSetResponderCapture?: (e: GestureResponderEvent) => boolean;
  }

  export namespace StyleSheet {
    export interface NamedStyles<T> {
      [key: string]: ViewStyle;
    }
  }

  export const StyleSheet: StyleSheetStatic;
  export const PanResponder: PanResponderStatic;
}
