import React, { ReactElement } from 'react';
import Task1 from '../nodes/task1/Task1';
import Task2 from '../nodes/task2/Task2';
import './sidebar.scss';

const onDragStart = (event: React.DragEvent<HTMLDivElement>, name: string) => {
    event.dataTransfer.setData('application/reactflow', name);
    event.dataTransfer.effectAllowed = 'move';
    console.log('onDragStart: ', name);
};

const props1 = {
    id: 'task1',
    type: 'task-1',
    selected: false,
    isConnectable: false,
    data: { label: 'Filter a list of targets recived based on advanced filter criteria to pass to subsequent tasks.'},
    onDragStart,
    showConnectionDots: false
};

const props2 = {
    id: 'task2',
    type: 'task-2',
    selected: false,
    isConnectable: false,
    data: { label: 'Filter a list of targets recived based on advanced filter criteria to pass to subsequent tasks.'},
    onDragStart,
    showConnectionDots: false
};

export default function Sidebar(): ReactElement {
    return (
        <aside className='sidebar'>
            <h3>Widgets</h3>
            <div className="widget-list">
                <Task1 {...props1} />
                <Task2 {...props2} />
            </div>
        </aside>
    )
}
