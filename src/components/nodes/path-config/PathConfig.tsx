import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../../interfaces/interfaces';
import './path-config.scss'

export default function PathConfig({ data, showConnectionDots = true, onDragStart }: CustomNodeProps): ReactElement {
    return (
        <div draggable={!data.isInFlow} className='path-config' onDragStart={event => onDragStart(event, 'path-config')}>
            <div className='path-label'>{data.label}</div>
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
