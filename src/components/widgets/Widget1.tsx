import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../interfaces/interfaces';
import './widget1.scss'

export default function Widget1({ data, showConnectionDots = true, onDragStart }: CustomNodeProps): ReactElement {
    return (
        <div draggable={!data.isInFlow} className='widget1' onDragStart={event => onDragStart(event, 'widget1')}>
            <div className='widget-title'>Widget 1</div>
            <div>{data.label}</div>
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
