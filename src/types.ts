import { ReactNode, MutableRefObject } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Direction of the panel group
 */
export type Direction = 'horizontal' | 'vertical';

/**
 * Panel information
 */
export interface PanelInfo {
  id: string;
  order: number;
  size: number;
  minSize: number;
  maxSize: number;
  ref: MutableRefObject<PanelMethods | null>;
}

/**
 * Resize handle information
 */
export interface ResizeHandleInfo {
  id: string;
  prevPanelId: string;
  nextPanelId: string;
}

/**
 * Panel group information
 */
export interface PanelGroupInfo {
  sizes: number[];
  direction: Direction;
}

/**
 * Panel context value
 */
export interface PanelContextValue {
  direction: Direction;
  registerPanel: (id: string, panel: PanelInfo) => void;
  unregisterPanel: (id: string) => void;
  getPanelGroup: () => PanelGroupInfo;
  updatePanelSize: (id: string, size: number) => void;
  startResize: (handleId: string) => void;
  endResize: () => void;
  resize: (handleId: string, delta: number) => void;
  registerResizeHandle: (id: string, prevPanelId: string, nextPanelId: string) => void;
}

/**
 * Panel methods
 */
export interface PanelMethods {
  resize: (size: number) => void;
  collapse: () => void;
  expand: () => void;
  getSize: () => number;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
}

/**
 * Panel group methods
 */
export interface PanelGroupMethods {
  getLayout: () => number[];
  setLayout: (sizes: number[]) => void;
}

/**
 * Storage interface
 */
export interface Storage {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
}

/**
 * Panel group storage interface
 */
export interface PanelGroupStorage extends Storage {
  getItem: (name: string) => Promise<string | null>;
  setItem: (name: string, value: string) => Promise<void>;
}

/**
 * Panel props
 */
export interface PanelProps {
  /**
   * Unique identifier for the panel
   * @required
   */
  id: string;
  
  /**
   * Initial size percentage (1-100)
   */
  defaultSize?: number;
  
  /**
   * Minimum size percentage (1-100)
   * @default 10
   */
  minSize?: number;
  
  /**
   * Maximum size percentage (1-100)
   * @default 100
   */
  maxSize?: number;
  
  /**
   * Whether panel can be collapsed
   * @default false
   */
  collapsible?: boolean;
  
  /**
   * Size when collapsed
   * @default 0
   */
  collapsedSize?: number;
  
  /**
   * Order of the panel (required for conditional rendering)
   */
  order?: number;
  
  /**
   * Callback when panel is resized
   */
  onResize?: (size: number) => void;
  
  /**
   * Callback when panel is collapsed
   */
  onCollapse?: () => void;
  
  /**
   * Callback when panel is expanded
   */
  onExpand?: () => void;
  
  /**
   * Style for the panel
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Panel group props
 */
export interface PanelGroupProps {
  /**
   * Direction of the panel group
   */
  direction?: Direction;

  /**
   * Unique identifier for auto-saving the layout
   */
  autoSaveId?: string;

  /**
   * Callback when layout changes
   */
  onLayout?: (sizes: number[]) => void;

  /**
   * Storage for saving and loading layouts
   */
  storage?: PanelGroupStorage;

  /**
   * Style for the panel group container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Panel resize handle props
 */
export interface PanelResizeHandleProps {
  /**
   * Disables resizing
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Unique identifier
   */
  id?: string;
  
  /**
   * Callback when dragging state changes
   */
  onDragging?: (isDragging: boolean) => void;
  
  /**
   * Extends the touch area
   */
  hitSlop?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
  
  /**
   * Style for the resize handle
   */
  style?: StyleProp<ViewStyle>;
  
  /**
   * Custom resize handle content
   */
  children?: ReactNode;
  
  /**
   * Previous panel ID
   */
  prevPanelId?: string;
  
  /**
   * Next panel ID
   */
  nextPanelId?: string;
}
