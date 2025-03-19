import AsyncStorage from '@react-native-async-storage/async-storage';
import { PanelGroupStorage } from './types';

const STORAGE_PREFIX = 'react-native-resizable-panels:';

/**
 * Default storage implementation using AsyncStorage
 */
export const defaultStorage: PanelGroupStorage = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(`${STORAGE_PREFIX}${name}`);
    } catch (error) {
      console.error('Error reading panel layout from AsyncStorage:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(`${STORAGE_PREFIX}${name}`, value);
    } catch (error) {
      console.error('Error saving panel layout to AsyncStorage:', error);
    }
  },
};

/**
 * Loads panel sizes from storage
 * @param id Unique identifier for the layout
 * @param storage Storage implementation
 * @returns Array of panel sizes or null if not found
 */
export async function loadPanelGroupLayout(
  id: string,
  storage: PanelGroupStorage = defaultStorage
): Promise<number[] | null> {
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
export async function savePanelGroupLayout(
  id: string,
  sizes: number[],
  storage: PanelGroupStorage = defaultStorage
): Promise<void> {
  try {
    await storage.setItem(id, JSON.stringify(sizes));
  } catch (error) {
    console.error('Error saving panel layout:', error);
  }
}
