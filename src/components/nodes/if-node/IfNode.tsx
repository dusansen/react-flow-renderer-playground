import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../../interfaces/interfaces';
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
                id="1"
                type="source"
                position={Position.Bottom}
            />
            <Handle
                id="2"
                type="source"
                position={Position.Right}
            />
        </div>
    );
}
