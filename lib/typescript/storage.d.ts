import { PanelGroupStorage } from './types';
/**
 * Default storage implementation using AsyncStorage
 */
export declare const defaultStorage: PanelGroupStorage;
/**
 * Loads panel sizes from storage
 * @param id Unique identifier for the layout
 * @param storage Storage implementation
 * @returns Array of panel sizes or null if not found
 */
export declare function loadPanelGroupLayout(id: string, storage?: PanelGroupStorage): Promise<number[] | null>;
/**
 * Saves panel sizes to storage
 * @param id Unique identifier for the layout
 * @param sizes Array of panel sizes
 * @param storage Storage implementation
 */
export declare function savePanelGroupLayout(id: string, sizes: number[], storage?: PanelGroupStorage): Promise<void>;
//# sourceMappingURL=storage.d.ts.map