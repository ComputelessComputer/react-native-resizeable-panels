import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { usePanelContext } from './PanelContext';
import { PanelResizeHandleProps } from './types';

// Generate a unique ID for resize handles without an explicit ID
let nextHandleId = 0;
const getNextHandleId = () => `resize-handle-${nextHandleId++}`;

/**
 * PanelResizeHandle component that allows resizing adjacent panels
 */
const PanelResizeHandle = ({
  children,
  disabled = false,
  id: propId,
  onDragging,
  hitSlop,
  style,
  prevPanelId,
  nextPanelId,
}: PanelResizeHandleProps): React.ReactElement => {
  // Generate a unique ID if one isn't provided
  const id = useRef(propId || getNextHandleId()).current;
  
  // Track the previous position for calculating delta
  const prevPositionRef = useRef(0);
  
  // Get the panel context
  const { direction, startResize, endResize, resize, registerResizeHandle } = usePanelContext();
  
  // Register the resize handle with the panel group
  useEffect(() => {
    if (prevPanelId && nextPanelId) {
      registerResizeHandle(id, prevPanelId, nextPanelId);
    }
  }, [id, prevPanelId, nextPanelId, registerResizeHandle]);
  
  // Create a pan responder for handling touch gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      
      onPanResponderGrant: () => {
        startResize(id);
        if (onDragging) onDragging(true);
        prevPositionRef.current = 0;
      },
      
      onPanResponderMove: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (disabled) return;
        
        const delta = direction === 'horizontal'
          ? gestureState.dx - prevPositionRef.current
          : gestureState.dy - prevPositionRef.current;
        
        if (delta !== 0) {
          resize(id, delta);
          prevPositionRef.current = direction === 'horizontal'
            ? gestureState.dx
            : gestureState.dy;
        }
      },
      
      onPanResponderRelease: () => {
        endResize();
        if (onDragging) onDragging(false);
        prevPositionRef.current = 0;
      },
      
      onPanResponderTerminate: () => {
        endResize();
        if (onDragging) onDragging(false);
        prevPositionRef.current = 0;
      },
    })
  ).current;

  // Get the style for the resize handle based on direction
  const getHandleStyle = useCallback((): StyleProp<ViewStyle> => {
    return direction === 'horizontal'
      ? styles.horizontalHandle
      : styles.verticalHandle;
  }, [direction]);

  return (
    <View
      {...panResponder.panHandlers}
      style={[styles.handle, getHandleStyle(), style]}
      hitSlop={hitSlop}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  handle: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalHandle: {
    width: 10,
    alignSelf: 'stretch',
    cursor: 'col-resize',
  },
  verticalHandle: {
    height: 10,
    alignSelf: 'stretch',
    cursor: 'row-resize',
  },
});

export default PanelResizeHandle;
