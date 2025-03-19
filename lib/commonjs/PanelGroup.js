"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PanelContext = require("./PanelContext");
var _storage = require("./storage");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * PanelGroup component that manages the layout and sizing of panels
 */
const PanelGroup = /*#__PURE__*/(0, _react.forwardRef)(({
  children,
  direction = 'horizontal',
  autoSaveId,
  onLayout,
  storage = _storage.defaultStorage,
  style
}, ref) => {
  // Track panels
  const [panels, setPanels] = (0, _react.useState)({});
  // Track resize handles
  const [resizeHandles, setResizeHandles] = (0, _react.useState)({});
  // Track current resize handle
  const [currentResizeHandle, setCurrentResizeHandle] = (0, _react.useState)(null);

  // Sort panels by order
  const sortedPanels = (0, _react.useMemo)(() => {
    return Object.values(panels).sort((a, b) => {
      return a.order - b.order;
    });
  }, [panels]);

  // Get panel IDs
  const panelIds = (0, _react.useMemo)(() => {
    return sortedPanels.map(panel => panel.id);
  }, [sortedPanels]);

  // Get panel sizes
  const panelSizes = (0, _react.useMemo)(() => {
    return sortedPanels.map(panel => panel.size);
  }, [sortedPanels]);

  // Register panel with panel group
  const registerPanel = (0, _react.useCallback)((id, panel) => {
    setPanels(prevPanels => {
      return {
        ...prevPanels,
        [id]: panel
      };
    });
  }, []);

  // Unregister panel from panel group
  const unregisterPanel = (0, _react.useCallback)(id => {
    setPanels(prevPanels => {
      const newPanels = {
        ...prevPanels
      };
      delete newPanels[id];
      return newPanels;
    });
  }, []);

  // Register resize handle with panel group
  const registerResizeHandle = (0, _react.useCallback)((id, prevPanelId, nextPanelId) => {
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
  const updatePanelSize = (0, _react.useCallback)((id, size) => {
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
  const startResize = (0, _react.useCallback)(handleId => {
    setCurrentResizeHandle(handleId);
  }, []);

  // End resize operation
  const endResize = (0, _react.useCallback)(() => {
    setCurrentResizeHandle(null);

    // Save layout if autoSaveId is provided
    if (autoSaveId) {
      (0, _storage.savePanelGroupLayout)(autoSaveId, panelSizes, storage);
    }

    // Call onLayout callback if provided
    if (onLayout) {
      onLayout(panelSizes);
    }
  }, [autoSaveId, onLayout, panelSizes, storage]);

  // Resize panels
  const resize = (0, _react.useCallback)((handleId, delta) => {
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
  const getPanelGroup = (0, _react.useCallback)(() => {
    return {
      sizes: panelSizes,
      direction
    };
  }, [direction, panelSizes]);

  // Get layout
  const getLayout = (0, _react.useCallback)(() => {
    return panelSizes;
  }, [panelSizes]);

  // Set layout
  const setLayout = (0, _react.useCallback)(sizes => {
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
      (0, _storage.savePanelGroupLayout)(autoSaveId, sizes, storage);
    }

    // Call onLayout callback if provided
    if (onLayout) {
      onLayout(sizes);
    }
  }, [autoSaveId, onLayout, panelIds, storage]);

  // Load layout on mount
  (0, _react.useEffect)(() => {
    if (autoSaveId) {
      (0, _storage.loadPanelGroupLayout)(autoSaveId, storage).then(savedSizes => {
        if (savedSizes) {
          setLayout(savedSizes);
        }
      });
    }
  }, [autoSaveId, setLayout, storage]);

  // Expose methods via ref
  (0, _react.useImperativeHandle)(ref, () => ({
    getLayout,
    setLayout
  }), [getLayout, setLayout]);

  // Panel context value
  const contextValue = (0, _react.useMemo)(() => ({
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
  return /*#__PURE__*/_react.default.createElement(_PanelContext.PanelProvider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, direction === 'horizontal' ? styles.horizontalContainer : styles.verticalContainer, style]
  }, children));
});
const styles = _reactNative.StyleSheet.create({
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
var _default = exports.default = PanelGroup;
//# sourceMappingURL=PanelGroup.js.map