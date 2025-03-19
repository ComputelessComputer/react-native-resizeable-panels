import PanelOriginal from './Panel';
import PanelGroupOriginal from './PanelGroup';
import PanelResizeHandleOriginal from './PanelResizeHandle';
import { defaultStorage, loadPanelGroupLayout, savePanelGroupLayout } from './storage';
// Create properly typed components for JSX compatibility
const Panel = PanelOriginal;
const PanelGroup = PanelGroupOriginal;
const PanelResizeHandle = PanelResizeHandleOriginal;
export { Panel, PanelGroup, PanelResizeHandle, defaultStorage, loadPanelGroupLayout, savePanelGroupLayout };
//# sourceMappingURL=index.js.map