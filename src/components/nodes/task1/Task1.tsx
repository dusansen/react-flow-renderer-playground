import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../../interfaces/interfaces';
import './task-1.scss'

export default function Task1({ data, showConnectionDots = true, onDragStart }: CustomNodeProps): ReactElement {
    return (
        <div draggable={!data.isInFlow} className='task1' onDragStart={event => onDragStart(event, 'task1')}>
            <div className='task-title'>Task 1</div>
            <div className="task-description">{data.label}</div>
            {showConnectionDots && (
                <>
                    <Handle
                        type="target"
                        position={Position.Top}
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                    />
                </>
            )}
        </div>
    )
}
