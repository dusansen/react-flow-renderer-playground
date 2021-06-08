import React, { ReactElement } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import { CustomNodeProps } from '../../interfaces/interfaces';
import './loop-node.scss';

export default function LoopNode({ data, showConnectionDots = true }: CustomNodeProps): ReactElement {
    return (
        <div className='loop-node'>
            <div className='loop-label'>
                {data.label}
            </div>
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
    );
}
