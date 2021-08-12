import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../../interfaces/interfaces';
import './initial-node.scss'

export default function InitialNode({ data }: CustomNodeProps): ReactElement {
    return (
        <div className='initial-node'>
            <div>{data.label}</div>
            <Handle
                type="target"
                position={Position.Top}
            />
            <Handle
                type="source"
                position={Position.Bottom}
            />
        </div>
    )
};
