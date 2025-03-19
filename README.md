# React Native Resizable Panels

A React Native implementation of resizable panels inspired by [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels).

## Features

- Create resizable panel layouts in React Native applications
- Support for both horizontal and vertical panel groups
- Customizable resize handles with touch interaction
- Persistent panel sizes using AsyncStorage
- Collapsible panels
- Imperative API for programmatic control
- TypeScript support

## Installation

```bash
# Using bun (recommended)
bun add react-native-resizable-panels

# Or using npm
npm install react-native-resizable-panels

# Or using yarn
yarn add react-native-resizable-panels
```

## Basic Usage

```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

export default function App() {
  return (
    <View style={styles.container}>
      <PanelGroup direction="horizontal" style={styles.panelGroup}>
        <Panel id="left" minSize={20} defaultSize={30} style={styles.leftPanel}>
          <Text>Left Panel</Text>
        </Panel>
        <PanelResizeHandle />
        <Panel id="right" minSize={30} style={styles.rightPanel}>
          <Text>Right Panel</Text>
        </Panel>
      </PanelGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  panelGroup: {
    flex: 1,
  },
  leftPanel: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightPanel: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## Components

### PanelGroup

Container component that manages the layout and sizing of panels.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the panel group |
| `autoSaveId` | `string` | - | Unique ID for persisting panel sizes in AsyncStorage |
| `onLayout` | `(sizes: number[]) => void` | - | Callback when panel sizes change |
| `storage` | `PanelGroupStorage` | `defaultStorage` | Custom storage implementation |
| `style` | `ViewStyle` | - | Style for the panel group container |
| `children` | `ReactNode` | - | Panel and PanelResizeHandle components |

### Panel

Individual panel component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **Required** | Unique identifier for the panel |
| `defaultSize` | `number` | `100` | Initial size percentage (1-100) |
| `minSize` | `number` | `10` | Minimum size percentage (1-100) |
| `maxSize` | `number` | `100` | Maximum size percentage (1-100) |
| `collapsible` | `boolean` | `false` | Whether panel can be collapsed |
| `collapsedSize` | `number` | `0` | Size when collapsed |
| `order` | `number` | - | Order of the panel (required for conditional rendering) |
| `onResize` | `(size: number) => void` | - | Callback when panel is resized |
| `onCollapse` | `() => void` | - | Callback when panel is collapsed |
| `onExpand` | `() => void` | - | Callback when panel is expanded |
| `style` | `ViewStyle` | - | Style for the panel |
| `children` | `ReactNode` | - | Panel content |

### PanelResizeHandle

Component for resizing adjacent panels.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disables resizing |
| `id` | `string` | Auto-generated | Unique identifier |
| `prevPanelId` | `string` | Auto-detected | ID of the previous panel |
| `nextPanelId` | `string` | Auto-detected | ID of the next panel |
| `onDragging` | `(isDragging: boolean) => void` | - | Callback when dragging state changes |
| `hitSlop` | `{ top?: number, left?: number, bottom?: number, right?: number }` | - | Extends the touch area |
| `style` | `ViewStyle` | - | Style for the resize handle |
| `children` | `ReactNode` | - | Custom resize handle content |

## Persistent Layouts

To persist panel sizes between app sessions:

```jsx
<PanelGroup
  direction="horizontal"
  autoSaveId="my-unique-layout-id"
>
  {/* Panels */}
</PanelGroup>
```

The panel sizes will be automatically saved to AsyncStorage and restored when the component mounts.

## Imperative API

Panels and PanelGroups expose refs for programmatic control:

```jsx
import React, { useRef } from 'react';
import { Button, View } from 'react-native';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

export default function App() {
  const panelRef = useRef(null);
  const panelGroupRef = useRef(null);

  const resetLayout = () => {
    panelGroupRef.current?.setLayout([30, 70]);
  };

  const collapsePanel = () => {
    panelRef.current?.collapse();
  };

  const expandPanel = () => {
    panelRef.current?.expand();
  };

  return (
    <View style={{ flex: 1 }}>
      <PanelGroup
        ref={panelGroupRef}
        direction="horizontal"
      >
        <Panel
          ref={panelRef}
          id="left-panel"
          collapsible
          minSize={20}
          defaultSize={30}
        >
          {/* Content */}
        </Panel>
        <PanelResizeHandle />
        <Panel id="right-panel">
          {/* Content */}
        </Panel>
      </PanelGroup>
      <Button title="Reset Layout" onPress={resetLayout} />
      <Button title="Collapse Panel" onPress={collapsePanel} />
      <Button title="Expand Panel" onPress={expandPanel} />
    </View>
  );
}
```

### Panel Methods

| Method | Description |
|--------|-------------|
| `collapse()` | Collapses the panel to its `collapsedSize` |
| `expand()` | Expands the panel to its previous size |
| `resize(size: number)` | Resizes the panel to the specified size |
| `getSize()` | Returns the current size of the panel |
| `isCollapsed()` | Returns whether the panel is currently collapsed |
| `isExpanded()` | Returns whether the panel is currently expanded |

### PanelGroup Methods

| Method | Description |
|--------|-------------|
| `getLayout()` | Returns an array of the current panel sizes |
| `setLayout(sizes: number[])` | Sets the sizes of all panels |

## Custom Storage

You can provide a custom storage implementation if you don't want to use AsyncStorage:

```jsx
const myStorage = {
  getItem: async (name) => {
    // Your custom implementation
    return localStorage.getItem(name);
  },
  setItem: async (name, value) => {
    // Your custom implementation
    localStorage.setItem(name, value);
  },
};

<PanelGroup
  direction="horizontal"
  autoSaveId="my-layout"
  storage={myStorage}
>
  {/* Panels */}
</PanelGroup>
```

## Example App

Check out the example app in the `/example` directory for a complete demonstration.

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/react-native-resizable-panels.git
cd react-native-resizable-panels

# Install dependencies
bun install

# Build the package
bun run build
```

## License

MIT
