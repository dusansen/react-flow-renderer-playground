import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../interfaces/interfaces';
import './if-node.scss';

export default function IfNode({ data, id }: CustomNodeProps): ReactElement {
    return (
        <div className={`if-node if-node-${id}`}>
            <div className='if-label'>
                {data.label}
            </div>
            <Handle
                type="target"
                position={Position.Top}
            />
            <Handle
                type="source"
                position={Position.Bottom}
            />
        </div>
    );
}
