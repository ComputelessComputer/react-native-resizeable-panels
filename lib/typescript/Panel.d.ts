import React, { ReactNode } from 'react';
import { PanelMethods, PanelProps } from './types';
/**
 * Panel component that represents a resizable section within a PanelGroup
 */
declare const Panel: React.FunctionComponent<PanelProps & {
    children?: ReactNode;
} & {
    ref?: React.Ref<PanelMethods> | undefined;
}>;
export default Panel;
//# sourceMappingURL=Panel.d.ts.map