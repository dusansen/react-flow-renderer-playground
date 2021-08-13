import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../../interfaces/interfaces';
import './initial-node.scss'

export default function InitialNode({
    data: {
        showSource = true,
        showTarget = true,
        label
    }
}: CustomNodeProps): ReactElement {
    return (
        <div className='initial-node'>
            <div>{label}</div>
            {showTarget && <Handle
                type="target"
                position={Position.Top}
            />}
            {showSource && <Handle
                type="source"
                position={Position.Bottom}
            />}
        </div>
    )
};
