import React, { ReactElement, useEffect } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../../interfaces/interfaces';
import './placeholder.scss'

export default function Placeholder({ data, showConnectionDots = true, onDragStart }: CustomNodeProps): ReactElement {
    return (
        <>
        <div
            draggable={!data.isInFlow}
            className='placeholder'
            onClick={data.onClick}
            onDragStart={event => onDragStart(event, 'placeholder')}
        >
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
        {data.hovered&& <div style={{ position: 'absolute', top: -8, left: -192, backgroundColor: 'red', height: '40px', width: '400px' }}>test</div>}
        </>
    )
}
