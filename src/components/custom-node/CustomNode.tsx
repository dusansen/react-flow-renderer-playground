import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../interfaces/interfaces';
import './custom-node.scss'

export default function CustomNode({ data }: CustomNodeProps): ReactElement {
    return (
        <div className='custom-node'>
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
}
