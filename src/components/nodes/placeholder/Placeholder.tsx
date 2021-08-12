import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../../interfaces/interfaces';
import './placeholder.scss'

export default function Placeholder({ data, showConnectionDots = true, onDragStart }: CustomNodeProps): ReactElement {
    return (
        <div draggable={!data.isInFlow} className='placeholder' onDragStart={event => onDragStart(event, 'placeholder')}>
            {showConnectionDots && (
                <>
                    <Handle
                        type="target"
                        position={Position.Top}
                        isConnectable={false}
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        isConnectable={false}
                    />
                </>
            )}
        </div>
    )
}
