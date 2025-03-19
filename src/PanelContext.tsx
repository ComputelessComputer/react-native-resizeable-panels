import { createContext, useContext } from 'react';
import { PanelContextValue } from './types';

// Create the panel context
const PanelContext = createContext<PanelContextValue>({
  direction: 'horizontal',
  registerPanel: () => {},
  unregisterPanel: () => {},
  getPanelGroup: () => ({ sizes: [], direction: 'horizontal' }),
  updatePanelSize: () => {},
  startResize: () => {},
  endResize: () => {},
  resize: () => {},
  registerResizeHandle: () => {},
});

/**
 * Hook to access the panel context
 * @returns Panel context value
 * @throws Error if used outside of a PanelGroup
 */
export function usePanelContext(): PanelContextValue {
  const context = useContext(PanelContext);
  
  if (context === null) {
    throw new Error(
      'Panel components must be used within a PanelGroup. ' +
      'Make sure you have wrapped your Panels with a PanelGroup component.'
    );
  }
  
  return context;
}

export const PanelProvider = PanelContext.Provider;
