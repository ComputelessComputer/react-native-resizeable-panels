"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelProvider = void 0;
exports.usePanelContext = usePanelContext;
var _react = require("react");
// Create the panel context
const PanelContext = /*#__PURE__*/(0, _react.createContext)({
  direction: 'horizontal',
  registerPanel: () => {},
  unregisterPanel: () => {},
  getPanelGroup: () => ({
    sizes: [],
    direction: 'horizontal'
  }),
  updatePanelSize: () => {},
  startResize: () => {},
  endResize: () => {},
  resize: () => {},
  registerResizeHandle: () => {}
});

/**
 * Hook to access the panel context
 * @returns Panel context value
 * @throws Error if used outside of a PanelGroup
 */
function usePanelContext() {
  const context = (0, _react.useContext)(PanelContext);
  if (context === null) {
    throw new Error('Panel components must be used within a PanelGroup. ' + 'Make sure you have wrapped your Panels with a PanelGroup component.');
  }
  return context;
}
const PanelProvider = exports.PanelProvider = PanelContext.Provider;
//# sourceMappingURL=PanelContext.js.map