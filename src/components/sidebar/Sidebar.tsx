import React, { ReactElement } from 'react';
import Widget1 from '../widgets/Widget1';
import Widget2 from '../widgets/Widget2';
import './sidebar.scss';

const onDragStart = (event: React.DragEvent<HTMLDivElement>, name: string) => {
    event.dataTransfer.setData('application/reactflow', name);
    event.dataTransfer.effectAllowed = 'move';
    console.log('onDragStart: ', name);
};

const props = {
    id: 'widget1',
    type: 'widget1',
    selected: false,
    isConnectable: false,
    data: { label: 'widget 1 description'},
    onDragStart,
    showConnectionDots: false
};

export default function Sidebar(): ReactElement {
    return (
        <aside className='sidebar'>
            <h3>Widgets</h3>
            <div className="widget-list">
                <Widget1 {...props} />
                <Widget2 {...props} id='widget2' type='widget2' />
            </div>
        </aside>
    )
}
