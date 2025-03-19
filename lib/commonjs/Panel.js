"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PanelContext = require("./PanelContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Panel component that represents a resizable section within a PanelGroup
 */
const Panel = /*#__PURE__*/(0, _react.forwardRef)(({
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
  const [size, setSize] = (0, _react.useState)(defaultSize);
  // Track collapsed state
  const [isCollapsed, setIsCollapsed] = (0, _react.useState)(false);
  // Get panel context
  const {
    direction,
    registerPanel,
    unregisterPanel,
    updatePanelSize
  } = (0, _PanelContext.usePanelContext)();

  // Create a ref to hold panel methods
  const methodsRef = (0, _react.useRef)({
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
  (0, _react.useEffect)(() => {
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
  (0, _react.useImperativeHandle)(ref, () => methodsRef.current, [methodsRef]);

  // Register panel with panel group on mount
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
    updatePanelSize(id, size);
  }, [id, size, updatePanelSize]);

  // Get the style for the panel based on direction and size
  const getPanelStyle = (0, _react.useCallback)(() => {
    const flexBasis = `${size}%`;
    return direction === 'horizontal' ? {
      ...styles.horizontalPanel,
      flexBasis
    } : {
      ...styles.verticalPanel,
      flexBasis
    };
  }, [direction, size]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.panel, getPanelStyle(), style]
  }, children);
});
const styles = _reactNative.StyleSheet.create({
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
var _default = exports.default = Panel;
//# sourceMappingURL=Panel.js.map