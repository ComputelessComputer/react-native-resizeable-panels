"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelResizeHandle = exports.PanelGroup = exports.Panel = void 0;
Object.defineProperty(exports, "defaultStorage", {
  enumerable: true,
  get: function () {
    return _storage.defaultStorage;
  }
});
Object.defineProperty(exports, "loadPanelGroupLayout", {
  enumerable: true,
  get: function () {
    return _storage.loadPanelGroupLayout;
  }
});
Object.defineProperty(exports, "savePanelGroupLayout", {
  enumerable: true,
  get: function () {
    return _storage.savePanelGroupLayout;
  }
});
var _Panel = _interopRequireDefault(require("./Panel"));
var _PanelGroup = _interopRequireDefault(require("./PanelGroup"));
var _PanelResizeHandle = _interopRequireDefault(require("./PanelResizeHandle"));
var _storage = require("./storage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create properly typed components for JSX compatibility
const Panel = exports.Panel = _Panel.default;
const PanelGroup = exports.PanelGroup = _PanelGroup.default;
const PanelResizeHandle = exports.PanelResizeHandle = _PanelResizeHandle.default;
//# sourceMappingURL=index.js.map