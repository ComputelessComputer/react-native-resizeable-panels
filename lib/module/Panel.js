import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { usePanelContext } from './PanelContext';
/**
 * Panel component that represents a resizable section within a PanelGroup
 */
const Panel = /*#__PURE__*/forwardRef(({
  children,
  id,
  defaultSize = 100,
  collapsible = false,
  collapsedSize = 0,
  minSize = 10,
  maxSize = 100,
  order = 0,
  onCollapse,
  onExpand,
  onResize,
  style
}, ref) => {
  if (!id) {
    throw new Error('Panel requires an id prop');
  }

  // Track panel size
  const [size, setSize] = useState(defaultSize);
  // Track collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Get panel context
  const {
    direction,
    registerPanel,
    unregisterPanel,
    updatePanelSize
  } = usePanelContext();

  // Create a ref to hold panel methods
  const methodsRef = useRef({
    resize: newSize => {
      if (isCollapsed && newSize > collapsedSize) {
        setIsCollapsed(false);
        onExpand === null || onExpand === void 0 || onExpand();
      }
      setSize(newSize);
      onResize === null || onResize === void 0 || onResize(newSize);
    },
    collapse: () => {
      if (!collapsible || isCollapsed) return;
      setIsCollapsed(true);
      setSize(collapsedSize);
      updatePanelSize(id, collapsedSize);
      onCollapse === null || onCollapse === void 0 || onCollapse();
    },
    expand: () => {
      if (!collapsible || !isCollapsed) return;
      setIsCollapsed(false);
      setSize(defaultSize);
      updatePanelSize(id, defaultSize);
      onExpand === null || onExpand === void 0 || onExpand();
    },
    getSize: () => size,
    isCollapsed: () => isCollapsed,
    isExpanded: () => !isCollapsed
  });

  // Update methods ref when dependencies change
  useEffect(() => {
    methodsRef.current = {
      resize: newSize => {
        if (isCollapsed && newSize > collapsedSize) {
          setIsCollapsed(false);
          onExpand === null || onExpand === void 0 || onExpand();
        }
        setSize(newSize);
        onResize === null || onResize === void 0 || onResize(newSize);
      },
      collapse: () => {
        if (!collapsible || isCollapsed) return;
        setIsCollapsed(true);
        setSize(collapsedSize);
        updatePanelSize(id, collapsedSize);
        onCollapse === null || onCollapse === void 0 || onCollapse();
      },
      expand: () => {
        if (!collapsible || !isCollapsed) return;
        setIsCollapsed(false);
        setSize(defaultSize);
        updatePanelSize(id, defaultSize);
        onExpand === null || onExpand === void 0 || onExpand();
      },
      getSize: () => size,
      isCollapsed: () => isCollapsed,
      isExpanded: () => !isCollapsed
    };
  }, [collapsedSize, collapsible, defaultSize, id, isCollapsed, onCollapse, onExpand, onResize, size, updatePanelSize]);

  // Imperative methods exposed via ref
  useImperativeHandle(ref, () => methodsRef.current, [methodsRef]);

  // Register panel with panel group on mount
  useEffect(() => {
    registerPanel(id, {
      id,
      order,
      size,
      minSize,
      maxSize: isCollapsed ? collapsedSize : maxSize,
      ref: methodsRef
    });
    return () => {
      unregisterPanel(id);
    };
  }, [collapsedSize, id, isCollapsed, maxSize, minSize, order, registerPanel, size, unregisterPanel]);

  // Update panel size when size changes
  useEffect(() => {
    updatePanelSize(id, size);
  }, [id, size, updatePanelSize]);

  // Get the style for the panel based on direction and size
  const getPanelStyle = useCallback(() => {
    const flexBasis = `${size}%`;
    return direction === 'horizontal' ? {
      ...styles.horizontalPanel,
      flexBasis
    } : {
      ...styles.verticalPanel,
      flexBasis
    };
  }, [direction, size]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.panel, getPanelStyle(), style]
  }, children);
});
const styles = StyleSheet.create({
  panel: {
    overflow: 'hidden'
  },
  horizontalPanel: {
    height: '100%'
  },
  verticalPanel: {
    width: '100%'
  }
});
export default Panel;
//# sourceMappingURL=Panel.js.map