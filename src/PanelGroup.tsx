import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { PanelProvider } from './PanelContext';
import {
  defaultStorage,
  loadPanelGroupLayout,
  savePanelGroupLayout,
} from './storage';
import {
  PanelGroupInfo,
  PanelGroupMethods,
  PanelGroupProps,
  PanelInfo,
  ResizeHandleInfo,
} from './types';

/**
 * PanelGroup component that manages the layout and sizing of panels
 */
const PanelGroup = forwardRef<PanelGroupMethods, PanelGroupProps & { children: ReactNode }>(
  (
    {
      children,
      direction = 'horizontal',
      autoSaveId,
      onLayout,
      storage = defaultStorage,
      style,
    },
    ref
  ) => {
    // Track panels
    const [panels, setPanels] = useState<Record<string, PanelInfo>>({});
    // Track resize handles
    const [resizeHandles, setResizeHandles] = useState<Record<string, ResizeHandleInfo>>({});
    // Track current resize handle
    const [currentResizeHandle, setCurrentResizeHandle] = useState<string | null>(null);

    // Sort panels by order
    const sortedPanels = useMemo(() => {
      return Object.values(panels).sort((a: PanelInfo, b: PanelInfo) => {
        return a.order - b.order;
      });
    }, [panels]);

    // Get panel IDs
    const panelIds = useMemo(() => {
      return sortedPanels.map((panel: PanelInfo) => panel.id);
    }, [sortedPanels]);

    // Get panel sizes
    const panelSizes = useMemo(() => {
      return sortedPanels.map((panel: PanelInfo) => panel.size);
    }, [sortedPanels]);

    // Register panel with panel group
    const registerPanel = useCallback((id: string, panel: PanelInfo) => {
      setPanels((prevPanels) => {
        return {
          ...prevPanels,
          [id]: panel,
        };
      });
    }, []);

    // Unregister panel from panel group
    const unregisterPanel = useCallback((id: string) => {
      setPanels((prevPanels) => {
        const newPanels = { ...prevPanels };
        delete newPanels[id];
        return newPanels;
      });
    }, []);

    // Register resize handle with panel group
    const registerResizeHandle = useCallback(
      (id: string, prevPanelId: string, nextPanelId: string) => {
        setResizeHandles((prevHandles) => {
          return {
            ...prevHandles,
            [id]: {
              id,
              prevPanelId,
              nextPanelId,
            },
          };
        });
      },
      []
    );

    // Update panel size
    const updatePanelSize = useCallback((id: string, size: number) => {
      setPanels((prevPanels) => {
        if (!prevPanels[id]) return prevPanels;

        return {
          ...prevPanels,
          [id]: {
            ...prevPanels[id],
            size,
          },
        };
      });
    }, []);

    // Start resize operation
    const startResize = useCallback((handleId: string) => {
      setCurrentResizeHandle(handleId);
    }, []);

    // End resize operation
    const endResize = useCallback(() => {
      setCurrentResizeHandle(null);

      // Save layout if autoSaveId is provided
      if (autoSaveId) {
        savePanelGroupLayout(autoSaveId, panelSizes, storage);
      }

      // Call onLayout callback if provided
      if (onLayout) {
        onLayout(panelSizes);
      }
    }, [autoSaveId, onLayout, panelSizes, storage]);

    // Resize panels
    const resize = useCallback(
      (handleId: string, delta: number) => {
        if (!currentResizeHandle) return;

        const handle = resizeHandles[handleId];
        if (!handle) return;

        const { prevPanelId, nextPanelId } = handle;
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
        setPanels((prevPanels) => {
          return {
            ...prevPanels,
            [prevPanelId]: {
              ...prevPanels[prevPanelId],
              size: prevPanelNewSize,
            },
            [nextPanelId]: {
              ...prevPanels[nextPanelId],
              size: nextPanelNewSize,
            },
          };
        });

        // Update panel refs
        prevPanel.ref.current?.resize(prevPanelNewSize);
        nextPanel.ref.current?.resize(nextPanelNewSize);
      },
      [currentResizeHandle, panels, resizeHandles]
    );

    // Get panel group info
    const getPanelGroup = useCallback((): PanelGroupInfo => {
      return {
        sizes: panelSizes,
        direction,
      };
    }, [direction, panelSizes]);

    // Get layout
    const getLayout = useCallback(() => {
      return panelSizes;
    }, [panelSizes]);

    // Set layout
    const setLayout = useCallback((sizes: number[]) => {
      if (sizes.length !== panelIds.length) return;

      // Update panel sizes
      setPanels((prevPanels) => {
        const newPanels = { ...prevPanels };

        panelIds.forEach((id, index) => {
          if (newPanels[id]) {
            newPanels[id] = {
              ...newPanels[id],
              size: sizes[index],
            };
          }
        });

        return newPanels;
      });

      // Save layout if autoSaveId is provided
      if (autoSaveId) {
        savePanelGroupLayout(autoSaveId, sizes, storage);
      }

      // Call onLayout callback if provided
      if (onLayout) {
        onLayout(sizes);
      }
    }, [autoSaveId, onLayout, panelIds, storage]);

    // Load layout on mount
    useEffect(() => {
      if (autoSaveId) {
        loadPanelGroupLayout(autoSaveId, storage).then((savedSizes) => {
          if (savedSizes) {
            setLayout(savedSizes);
          }
        });
      }
    }, [autoSaveId, setLayout, storage]);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        getLayout,
        setLayout,
      }),
      [getLayout, setLayout]
    );

    // Panel context value
    const contextValue = useMemo(
      () => ({
        direction,
        registerPanel,
        unregisterPanel,
        getPanelGroup,
        updatePanelSize,
        startResize,
        endResize,
        resize,
        registerResizeHandle,
      }),
      [
        direction,
        endResize,
        getPanelGroup,
        registerPanel,
        resize,
        startResize,
        unregisterPanel,
        updatePanelSize,
        registerResizeHandle,
      ]
    );

    return (
      <PanelProvider value={contextValue}>
        <View
          style={[
            styles.container,
            direction === 'horizontal'
              ? styles.horizontalContainer
              : styles.verticalContainer,
            style,
          ]}
        >
          {children}
        </View>
      </PanelProvider>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
});

export default PanelGroup;
