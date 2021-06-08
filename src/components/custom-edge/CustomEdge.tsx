import { ReactElement } from 'react';
import { EdgeProps, getMarkerEnd, getSmoothStepPath } from 'react-flow-renderer';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    arrowHeadType,
    markerEndId,
}: EdgeProps): ReactElement {
    const edgePath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const textCickHandler = (e: React.MouseEvent<SVGTextPathElement, MouseEvent>) => {
        e.preventDefault();
        console.log('text clicked');
    }

    return (
        <>
          <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
          <text>
                <textPath onClick={textCickHandler} href={`#${id}`} style={{ fontSize: '16px' }} startOffset="50%" textAnchor="middle">
                {data.label}
                </textPath>
          </text>
        </>
      );
}
