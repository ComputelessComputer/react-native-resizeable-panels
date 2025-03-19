"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultStorage = void 0;
exports.loadPanelGroupLayout = loadPanelGroupLayout;
exports.savePanelGroupLayout = savePanelGroupLayout;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const STORAGE_PREFIX = 'react-native-resizable-panels:';

/**
 * Default storage implementation using AsyncStorage
 */
const defaultStorage = exports.defaultStorage = {
  getItem: async name => {
    try {
      return await _asyncStorage.default.getItem(`${STORAGE_PREFIX}${name}`);
    } catch (error) {
      console.error('Error reading panel layout from AsyncStorage:', error);
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await _asyncStorage.default.setItem(`${STORAGE_PREFIX}${name}`, value);
    } catch (error) {
      console.error('Error saving panel layout to AsyncStorage:', error);
    }
  }
};

/**
 * Loads panel sizes from storage
 * @param id Unique identifier for the layout
 * @param storage Storage implementation
 * @returns Array of panel sizes or null if not found
 */
async function loadPanelGroupLayout(id, storage = defaultStorage) {
  try {
    const serializedSizes = await storage.getItem(id);
    if (serializedSizes) {
      return JSON.parse(serializedSizes);
    }
    return null;
  } catch (error) {
    console.error('Error loading panel layout:', error);
    return null;
  }
}

/**
 * Saves panel sizes to storage
 * @param id Unique identifier for the layout
 * @param sizes Array of panel sizes
 * @param storage Storage implementation
 */
async function savePanelGroupLayout(id, sizes, storage = defaultStorage) {
  try {
    await storage.setItem(id, JSON.stringify(sizes));
  } catch (error) {
    console.error('Error saving panel layout:', error);
  }
}
//# sourceMappingURL=storage.js.map