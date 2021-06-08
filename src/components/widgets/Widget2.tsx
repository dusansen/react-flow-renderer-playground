import React, { ReactElement } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../interfaces/interfaces';
import './widget1.scss'

export default function Widget2({ data, showConnectionDots = true, onDragStart }: CustomNodeProps): ReactElement {
    return (
        <div draggable={!data.isInFlow} className='widget2' onDragStart={event => onDragStart(event, 'widget2')}>
            <div className='widget-title'>Widget 2</div>
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