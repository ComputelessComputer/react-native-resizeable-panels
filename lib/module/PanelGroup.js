import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanelProvider } from './PanelContext';
import { defaultStorage, loadPanelGroupLayout, savePanelGroupLayout } from './storage';
/**
 * PanelGroup component that manages the layout and sizing of panels
 */
const PanelGroup = /*#__PURE__*/forwardRef(({
  children,
  direction = 'horizontal',
  autoSaveId,
  onLayout,
  storage = defaultStorage,
  style
}, ref) => {
  // Track panels
  const [panels, setPanels] = useState({});
  // Track resize handles
  const [resizeHandles, setResizeHandles] = useState({});
  // Track current resize handle
  const [currentResizeHandle, setCurrentResizeHandle] = useState(null);

  // Sort panels by order
  const sortedPanels = useMemo(() => {
    return Object.values(panels).sort((a, b) => {
      return a.order - b.order;
    });
  }, [panels]);

  // Get panel IDs
  const panelIds = useMemo(() => {
    return sortedPanels.map(panel => panel.id);
  }, [sortedPanels]);

  // Get panel sizes
  const panelSizes = useMemo(() => {
    return sortedPanels.map(panel => panel.size);
  }, [sortedPanels]);

  // Register panel with panel group
  const registerPanel = useCallback((id, panel) => {
    setPanels(prevPanels => {
      return {
        ...prevPanels,
        [id]: panel
      };
    });
  }, []);

  // Unregister panel from panel group
  const unregisterPanel = useCallback(id => {
    setPanels(prevPanels => {
      const newPanels = {
        ...prevPanels
      };
      delete newPanels[id];
      return newPanels;
    });
  }, []);

  // Register resize handle with panel group
  const registerResizeHandle = useCallback((id, prevPanelId, nextPanelId) => {
    setResizeHandles(prevHandles => {
      return {
        ...prevHandles,
        [id]: {
          id,
          prevPanelId,
          nextPanelId
        }
      };
    });
  }, []);

  // Update panel size
  const updatePanelSize = useCallback((id, size) => {
    setPanels(prevPanels => {
      if (!prevPanels[id]) return prevPanels;
      return {
        ...prevPanels,
        [id]: {
          ...prevPanels[id],
          size
        }
      };
    });
  }, []);

  // Start resize operation
  const startResize = useCallback(handleId => {
    setCurrentResizeHandle(handleId);
  }, []);

  // End resize operation
  const endResize = useCallback(() => {
    setCurrentResizeHandle(null);

    // Save layout if autoSaveId is provided
    if (autoSaveId) {
      savePanelGroupLayout(autoSaveId, panelSizes, storage);
    }

    // Call onLayout callback if provided
    if (onLayout) {
      onLayout(panelSizes);
    }
  }, [autoSaveId, onLayout, panelSizes, storage]);

  // Resize panels
  const resize = useCallback((handleId, delta) => {
    var _prevPanel$ref$curren, _nextPanel$ref$curren;
    if (!currentResizeHandle) return;
    const handle = resizeHandles[handleId];
    if (!handle) return;
    const {
      prevPanelId,
      nextPanelId
    } = handle;
    const prevPanel = panels[prevPanelId];
    const nextPanel = panels[nextPanelId];
    if (!prevPanel || !nextPanel) return;

    // Calculate new sizes
    let prevPanelNewSize = prevPanel.size + delta;
    let nextPanelNewSize = nextPanel.size - delta;

    // Enforce min/max sizes
    if (prevPanelNewSize < prevPanel.minSize) {
      const diff = prevPanel.minSize - prevPanelNewSize;
      prevPanelNewSize = prevPanel.minSize;
      nextPanelNewSize += diff;
    } else if (prevPanelNewSize > prevPanel.maxSize) {
      const diff = prevPanelNewSize - prevPanel.maxSize;
      prevPanelNewSize = prevPanel.maxSize;
      nextPanelNewSize -= diff;
    }
    if (nextPanelNewSize < nextPanel.minSize) {
      const diff = nextPanel.minSize - nextPanelNewSize;
      nextPanelNewSize = nextPanel.minSize;
      prevPanelNewSize -= diff;
    } else if (nextPanelNewSize > nextPanel.maxSize) {
      const diff = nextPanelNewSize - nextPanel.maxSize;
      nextPanelNewSize = nextPanel.maxSize;
      prevPanelNewSize += diff;
    }

    // Update panel sizes
    setPanels(prevPanels => {
      return {
        ...prevPanels,
        [prevPanelId]: {
          ...prevPanels[prevPanelId],
          size: prevPanelNewSize
        },
        [nextPanelId]: {
          ...prevPanels[nextPanelId],
          size: nextPanelNewSize
        }
      };
    });

    // Update panel refs
    (_prevPanel$ref$curren = prevPanel.ref.current) === null || _prevPanel$ref$curren === void 0 || _prevPanel$ref$curren.resize(prevPanelNewSize);
    (_nextPanel$ref$curren = nextPanel.ref.current) === null || _nextPanel$ref$curren === void 0 || _nextPanel$ref$curren.resize(nextPanelNewSize);
  }, [currentResizeHandle, panels, resizeHandles]);

  // Get panel group info
  const getPanelGroup = useCallback(() => {
    return {
      sizes: panelSizes,
      direction
    };
  }, [direction, panelSizes]);

  // Get layout
  const getLayout = useCallback(() => {
    return panelSizes;
  }, [panelSizes]);

  // Set layout
  const setLayout = useCallback(sizes => {
    if (sizes.length !== panelIds.length) return;

    // Update panel sizes
    setPanels(prevPanels => {
      const newPanels = {
        ...prevPanels
      };
      panelIds.forEach((id, index) => {
        if (newPanels[id]) {
          newPanels[id] = {
            ...newPanels[id],
            size: sizes[index]
          };
        }
      });
      return newPanels;
    });

    // Save layout if autoSaveId is provided
    if (autoSaveId) {
      savePanelGroupLayout(autoSaveId, sizes, storage);
    }

    // Call onLayout callback if provided
    if (onLayout) {
      onLayout(sizes);
    }
  }, [autoSaveId, onLayout, panelIds, storage]);

  // Load layout on mount
  useEffect(() => {
    if (autoSaveId) {
      loadPanelGroupLayout(autoSaveId, storage).then(savedSizes => {
        if (savedSizes) {
          setLayout(savedSizes);
        }
      });
    }
  }, [autoSaveId, setLayout, storage]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    getLayout,
    setLayout
  }), [getLayout, setLayout]);

  // Panel context value
  const contextValue = useMemo(() => ({
    direction,
    registerPanel,
    unregisterPanel,
    getPanelGroup,
    updatePanelSize,
    startResize,
    endResize,
    resize,
    registerResizeHandle
  }), [direction, endResize, getPanelGroup, registerPanel, resize, startResize, unregisterPanel, updatePanelSize, registerResizeHandle]);
  return /*#__PURE__*/React.createElement(PanelProvider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, direction === 'horizontal' ? styles.horizontalContainer : styles.verticalContainer, style]
  }, children));
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  verticalContainer: {
    flexDirection: 'column'
  }
});
export default PanelGroup;
//# sourceMappingURL=PanelGroup.js.map