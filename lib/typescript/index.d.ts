import React from 'react';
import { defaultStorage, loadPanelGroupLayout, savePanelGroupLayout } from './storage';
import type { Direction, PanelContextValue, PanelGroupInfo, PanelGroupMethods, PanelGroupProps, PanelGroupStorage, PanelInfo, PanelMethods, PanelProps, PanelResizeHandleProps, ResizeHandleInfo } from './types';
declare const Panel: any;
declare const PanelGroup: any;
declare const PanelResizeHandle: ({ children, disabled, id: propId, onDragging, hitSlop, style, prevPanelId, nextPanelId, }: PanelResizeHandleProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export { Panel, PanelGroup, PanelResizeHandle, defaultStorage, loadPanelGroupLayout, savePanelGroupLayout, };
export type { Direction, PanelContextValue, PanelGroupInfo, PanelGroupMethods, PanelGroupProps, PanelGroupStorage, PanelInfo, PanelMethods, PanelProps, PanelResizeHandleProps, ResizeHandleInfo, };
//# sourceMappingURL=index.d.ts.map