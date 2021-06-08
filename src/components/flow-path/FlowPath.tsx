import React, { ReactElement, useMemo } from 'react'
import { Handle, Position } from 'react-flow-renderer';
import './flow-path.scss';

const flowPathStyle = [
    '#f6e58d',
    '#6ab04c',
    '#686de0',
    '#eb4d4b',
    '#130f40'
];

export default function FlowPath(): ReactElement {
    const style = useMemo(() => {
        const color = flowPathStyle[Math.floor(Math.random() * 5)];
        return {
            backgroundColor: color,
            borderRadius: '20px'
        }
    }, []);

    return (
        <div
            className='flow-path'
            style={style}
        >
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