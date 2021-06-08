import { FC } from 'react';
import './options.scss';

interface Props {
    position: {
        x: number;
        y: number;
    },
    onOptionSelect: (e: React.MouseEvent<Element, MouseEvent>, option: string) => void
}

const Options: FC<Props> = ({ position, onOptionSelect }) => {
    return (
        <div className='workflow-options' style={{ left: position.x, top: position.y }}>
            <div className='option' onClick={event => onOptionSelect(event, 'if')}>If condition</div> 
            <div className='option' onClick={event => onOptionSelect(event, 'loop')}>Loop Condition</div>
            <div className='option' onClick={event => onOptionSelect(event, 'connection')}>Connection</div>
        </div>
    )
};

export default Options;
