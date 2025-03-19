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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  nextPanelId
}) => {
  // Generate a unique ID if one isn't provided
  const id = (0, _react.useRef)(propId || getNextHandleId()).current;

  // Track the previous position for calculating delta
  const prevPositionRef = (0, _react.useRef)(0);

  // Get the panel context
  const {
    direction,
    startResize,
    endResize,
    resize,
    registerResizeHandle
  } = (0, _PanelContext.usePanelContext)();

  // Register the resize handle with the panel group
  (0, _react.useEffect)(() => {
    if (prevPanelId && nextPanelId) {
      registerResizeHandle(id, prevPanelId, nextPanelId);
    }
  }, [id, prevPanelId, nextPanelId, registerResizeHandle]);

  // Create a pan responder for handling touch gestures
  const panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: () => {
      startResize(id);
      if (onDragging) onDragging(true);
      prevPositionRef.current = 0;
    },
    onPanResponderMove: (_, gestureState) => {
      if (disabled) return;
      const delta = direction === 'horizontal' ? gestureState.dx - prevPositionRef.current : gestureState.dy - prevPositionRef.current;
      if (delta !== 0) {
        resize(id, delta);
        prevPositionRef.current = direction === 'horizontal' ? gestureState.dx : gestureState.dy;
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
    }
  })).current;

  // Get the style for the resize handle based on direction
  const getHandleStyle = (0, _react.useCallback)(() => {
    return direction === 'horizontal' ? styles.horizontalHandle : styles.verticalHandle;
  }, [direction]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, panResponder.panHandlers, {
    style: [styles.handle, getHandleStyle(), style],
    hitSlop: hitSlop
  }), children);
};
const styles = _reactNative.StyleSheet.create({
  handle: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalHandle: {
    width: 10,
    alignSelf: 'stretch',
    cursor: 'col-resize'
  },
  verticalHandle: {
    height: 10,
    alignSelf: 'stretch',
    cursor: 'row-resize'
  }
});
var _default = exports.default = PanelResizeHandle;
//# sourceMappingURL=PanelResizeHandle.js.map