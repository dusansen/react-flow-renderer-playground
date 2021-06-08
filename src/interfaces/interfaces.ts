import React from 'react';
import { NodeProps } from 'react-flow-renderer';

export interface CustomNodeProps extends NodeProps {
    showConnectionDots: boolean,
    onDragStart: (event: React.DragEvent<HTMLDivElement>, name: string) => void;
}
