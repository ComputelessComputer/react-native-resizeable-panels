import React, { ReactNode } from 'react';
import PanelOriginal from './Panel';
import PanelGroupOriginal from './PanelGroup';
import PanelResizeHandleOriginal from './PanelResizeHandle';
import { defaultStorage, loadPanelGroupLayout, savePanelGroupLayout } from './storage';
import type {
  Direction,
  PanelContextValue,
  PanelGroupInfo,
  PanelGroupMethods,
  PanelGroupProps,
  PanelGroupStorage,
  PanelInfo,
  PanelMethods,
  PanelProps,
  PanelResizeHandleProps,
  ResizeHandleInfo,
} from './types';

// Create properly typed components for JSX compatibility
const Panel = PanelOriginal as any;
const PanelGroup = PanelGroupOriginal as any;
const PanelResizeHandle = PanelResizeHandleOriginal;

export {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  defaultStorage,
  loadPanelGroupLayout,
  savePanelGroupLayout,
};

export type {
  Direction,
  PanelContextValue,
  PanelGroupInfo,
  PanelGroupMethods,
  PanelGroupProps,
  PanelGroupStorage,
  PanelInfo,
  PanelMethods,
  PanelProps,
  PanelResizeHandleProps,
  ResizeHandleInfo,
};
