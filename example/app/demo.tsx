import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Import from the package
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';
import type { PanelMethods, PanelGroupMethods } from 'react-native-resizable-panels';

// Simple colored block component for panel content
const ColorBlock = ({ color, children }: { color: string; children?: React.ReactNode }) => (
  <View style={[styles.colorBlock, { backgroundColor: color }]}>
    {children}
  </View>
);

export default function DemoScreen() {
  // Panel refs for imperative control
  const panel1Ref = useRef<PanelMethods>(null);
  const panel2Ref = useRef<PanelMethods>(null);
  const panelGroupRef = useRef<PanelGroupMethods>(null);
  
  // State to track panel sizes
  const [panel1Size, setPanel1Size] = useState<number>(50);
  const [panel2Size, setPanel2Size] = useState<number>(50);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Resizable Panels Demo</Text>
      
      {/* Horizontal Panel Group */}
      <View style={styles.demoSection}>
        <Text style={styles.sectionTitle}>Horizontal Layout</Text>
        <PanelGroup 
          direction="horizontal"
          ref={panelGroupRef as React.RefObject<PanelGroupMethods>}
          onLayout={(sizes: number[]) => {
            console.log('Horizontal panel sizes:', sizes);
          }}
        >
          <Panel 
            id="panel1" 
            ref={panel1Ref as React.RefObject<PanelMethods>}
            defaultSize={panel1Size}
            collapsible={true}
            onResize={(size: number) => setPanel1Size(size)}
          >
            <ColorBlock color="#5B8FB9">
              <Text style={styles.panelText}>Panel 1</Text>
              <Text style={styles.panelSizeText}>{`Size: ${panel1Size.toFixed(1)}%`}</Text>
            </ColorBlock>
          </Panel>
          
          <PanelResizeHandle>
            <View style={styles.horizontalHandle} />
          </PanelResizeHandle>
          
          <Panel 
            id="panel2" 
            ref={panel2Ref as React.RefObject<PanelMethods>}
            defaultSize={panel2Size}
            collapsible={true}
            onResize={(size: number) => setPanel2Size(size)}
          >
            <ColorBlock color="#B8621B">
              <Text style={styles.panelText}>Panel 2</Text>
              <Text style={styles.panelSizeText}>{`Size: ${panel2Size.toFixed(1)}%`}</Text>
            </ColorBlock>
          </Panel>
        </PanelGroup>
      </View>
      
      {/* Control buttons */}
      <View style={styles.controls}>
        <View style={styles.buttonRow}>
          <Button 
            title="Collapse Panel 1" 
            onPress={() => panel1Ref.current?.collapse()}
          />
          <Button 
            title="Expand Panel 1" 
            onPress={() => panel1Ref.current?.expand()}
          />
        </View>
        <View style={styles.buttonRow}>
          <Button 
            title="Collapse Panel 2" 
            onPress={() => panel2Ref.current?.collapse()}
          />
          <Button 
            title="Expand Panel 2" 
            onPress={() => panel2Ref.current?.expand()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  demoSection: {
    marginBottom: 20,
    height: 300,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  panelSizeText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  horizontalHandle: {
    width: 8,
    height: '100%',
    backgroundColor: '#ddd',
  },
  controls: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
