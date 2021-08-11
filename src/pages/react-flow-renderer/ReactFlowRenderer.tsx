import React, { ReactElement, useState, useRef, useEffect } from 'react'
import ReactFlow, { Background, MiniMap, Controls, FlowElement, OnLoadParams, Edge, isEdge, Connection, Node, Elements, getIncomers, isNode, BackgroundVariant } from 'react-flow-renderer';
import CustomEdge from '../../components/custom-edge/CustomEdge';
import CustomNode from '../../components/custom-node/CustomNode';
import FlowPath from '../../components/flow-path/FlowPath';
import IfNode from '../../components/if-node/IfNode';
import LoopNode from '../../components/loop-node/LoopNode';
import Options from '../../components/options/Options';
import Sidebar from '../../components/sidebar/Sidebar';
import Widget1 from '../../components/widgets/Widget1';
import Widget2 from '../../components/widgets/Widget2';
import dagre from 'dagre';
import './react-flow-renderer.scss';
import { edges1, nodes1 } from '../../test_data/test1';
import { edges2, nodes2 } from '../../test_data/test2';
import { edges3, nodes3 } from '../../test_data/test3';

const WIDGET_HEIGHT = 50;
const CURSOR_HEIGHT = 20;
const PATH_MARGIN = 20;

const MAIN_PATH_ID = '1';

interface INodeData {
    label: string;
    path: string;
    isInFlow?: boolean;
    nodeWidth: number
};

export default function ReactFlowRenderer(): ReactElement {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [clickEdgeNodes, setClickEdgeNodes] = useState<string[]>([]);
    const [showWorkflowOptions, setShowWorkflowOptions] = useState(false);
    const [optionsStyles, setOptionsStyles] = useState({ x: 0, y: 0 });
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams<any> | null>(null);
    const [nodes, setNodes] = useState<Node<INodeData>[]>(nodes3);
    const [edges, setEdges] = useState<Edge[]>(edges3);
    const [elements, setElements] = useState<Elements>([]);

    const getNewPathEdges = (
        aboveNodeId: string,
        bellowNodeId: string,
        ifNode: Node<INodeData>,
        newPathNodes: Node<INodeData>[]
    ) => ([
        {
            id: `e${aboveNodeId}-${ifNode.id}`,
            source: aboveNodeId,
            target: ifNode.id,
            type: 'smoothstep',
            label: 'Add'
        },
        {
            id: `e${ifNode.id}-${newPathNodes[0].id}`,
            source: ifNode.id,
            target: newPathNodes[0].id,
            type: 'smoothstep'
        },
        {
            id: `e${ifNode.id}-${newPathNodes[1].id}`,
            source: ifNode.id,
            target: newPathNodes[1].id,
            type: 'smoothstep'
        },
        {
            id: `e${newPathNodes[0].id}-${bellowNodeId}`,
            source: newPathNodes[0].id,
            target: bellowNodeId,
            type: 'smoothstep'
        },
        {
            id: `e${newPathNodes[1].id}-${bellowNodeId}`,
            source: newPathNodes[1].id,
            target: bellowNodeId,
            type: 'smoothstep'
        }
    ]);

    const createNewIfConditionNodes = (pathId: string) => {
        const main = document.getElementsByClassName('react-flow')[0];
        const pathWidth = main.clientWidth;
        const ifNode = {
            id: `if_${Math.random()}`,
            type: 'if',
            data: {
                label: 'IF',
                isInFlow: true,
                path: pathId,
                nodeWidth: 50
            },
            position: { x: 0, y: 0 }
        } as Node<INodeData>;
        const path1 = {
            id: `path${pathId}.1.${Math.random()}`,
            type: 'path',
            data: {
                label: 'IF',
                isInFlow: true,
                path: pathId,
                nodeWidth: pathWidth / 2 - PATH_MARGIN * 2
            },
            position: { x: 0, y: 0 }
        } as Node<INodeData>;
        const path2 = {
            id: `path${pathId}.2.${Math.random()}`,
            type: 'path',
            data: {
                label: 'IF',
                isInFlow: true,
                path: pathId,
                nodeWidth: pathWidth / 2 - PATH_MARGIN * 2
            },
            position: { x: 0, y: 0 }
        } as Node<INodeData>;
        return [ifNode, path1, path2];
    };

    const createNewPathConnections = (nodeAboveIndex: number, nodeBelowIndex: number, ifNode: Node<INodeData>, pathNodes: Node<INodeData>[]) => {
        const aboveNodeId = elements[nodeAboveIndex].id;
        const bellowNodeId = elements[nodeBelowIndex].id;
        const remainingEdges = edges.filter(edge => edge.source !== aboveNodeId || bellowNodeId !== edge.target);
        const newEdges = getNewPathEdges(aboveNodeId, bellowNodeId, ifNode, pathNodes);
        return [...remainingEdges, ...newEdges];
    };

    const addIfNode = (e: React.MouseEvent<Element, MouseEvent>) => {
        const pathId = getPathId(e.clientX, e.clientY);
        const [ifNode, ...pathNodes] = createNewIfConditionNodes(pathId);
        const { nodeAboveIndex, nodeBelowIndex } = getSurroundingNodesIndex(e.clientX, e.clientY, pathId);
        if (nodeAboveIndex === -1 || nodeBelowIndex === -1) {
            console.log('DROP FAILED');
            return;
        }
        const newNodes = [...nodes, ifNode, ...pathNodes];
        const newConnections = createNewPathConnections(nodeAboveIndex, nodeBelowIndex, ifNode, pathNodes);
        const layoutedElements = getLayoutedElements(newNodes, newConnections);
        setNodes(newNodes);
        setEdges(newConnections);
        setElements(layoutedElements);
        // const newConnections = createNewPathConnections(clickEdgeNodes, newIfNode, newPathNodes) as Edge<any>[];
        // const newNodesWithPositions = getNodesWithNewPositions(elementAboveIndex + 1, [newIfNode, ...newPathNodes]);
        // setNodes(newNodesWithPositions);
        // setEdges(newConnections);
        // setElements([...newNodesWithPositions, ...newConnections]);
    };

    const onOptionSelect = (e: React.MouseEvent<Element, MouseEvent>, selectedOption: string) => {
        setShowWorkflowOptions(false);
        switch (selectedOption) {
            case 'if':
                addIfNode(e);
                break;
            default:
        }
    };

    const getElementAboveIndex = (x: number, y: number) => {
        const bellowElementIndex = nodes.findIndex(node => node.position.y > y - CURSOR_HEIGHT);
        return bellowElementIndex === -1 ? -1 : bellowElementIndex - 1;
    };

    const getSurroundingNodesIndex = (x: number, y: number, pathId: string) => {
        let nodeAboveIndex = -1;
        let aboveMin = 0;
        let nodeBelowIndex = -1;
        let belowMin = 10000;
        elements.forEach((node, index) => {
            if (!isNode(node) || !node.data || (node.data.path !== pathId && node.id !== pathId)) {
                return;
            }
            if ((node.position.y < y - CURSOR_HEIGHT && node.position.y > aboveMin) || (nodeAboveIndex === -1 && node.id === pathId)) {
                aboveMin = node.position.y;
                nodeAboveIndex = index;
            }
            if ((node.position.y > y - CURSOR_HEIGHT && node.position.y < belowMin) || (nodeBelowIndex === -1 && node.id === pathId)) {
                belowMin = node.position.y;
                nodeBelowIndex = index;
            }
        });
        return {
            nodeAboveIndex,
            nodeBelowIndex
        };
    };

    const getNewNodeEdges = (aboveNodeId: string, bellowNodeId: string, newNode: Node<INodeData>) => ([
        {
            id: `e${aboveNodeId}-${newNode.id}`,
            source: aboveNodeId,
            target: newNode.id,
            type: 'smoothstep',
            label: 'Add'
        }, {
            id: `e${newNode.id}-${bellowNodeId}`,
            source: newNode.id,
            target: bellowNodeId,
            type: 'smoothstep',
            label: 'Add'
        }
    ]);

    const createNewNodeConnections = (nodeAboveIndex: number, nodeBelowIndex: number, newNode: Node<INodeData>) => {
        const aboveNodeId = elements[nodeAboveIndex].id;
        const bellowNodeId = elements[nodeBelowIndex].id;
        const remainingEdges = edges.filter(edge => edge.source !== aboveNodeId || bellowNodeId !== edge.target);
        const newEdges = getNewNodeEdges(aboveNodeId, bellowNodeId, newNode);
        return [...remainingEdges, ...newEdges];
    };

    const createNewWidgetNode = (type: string, pathId: string) => {
        const main = document.getElementsByClassName('react-flow')[0];
        const pathWidth = main.clientWidth;

        const newNode = {
            id: `dndnode_${Math.random()}`,
            type,
            position: { x: 0, y: 0 },
            data: {
                label: `${type} node`,
                isInFlow: true,
                path: pathId,
                nodeWidth: pathWidth
            },
            style: {
                width: '100%'
            }
        } as Node<INodeData>;
        return newNode;
    }

    const clickHandler = (e: React.MouseEvent<Element, MouseEvent>, element: FlowElement<any>) => {
        console.log('clickHandler element: ', element);
        if(isNode(element)) {
            console.log('incomers: ', getIncomers(element, elements));
        }
        if(isEdge(element)) {
            setOptionsStyles({
                x: e.clientX,
                y: e.clientY
            });
            setShowWorkflowOptions(true);
            setClickEdgeNodes([element.source, element.target]);
        }
        return e;
    };

    const onLoadHandler = (_instance: OnLoadParams) => {
        setReactFlowInstance(_instance);
    };

    const onConnect = ({ source, target }: Edge<any> | Connection) => {
        const newConnection = {
            id: `e${source}-${target}`,
            source,
            target,
            type: 'smoothstep',
            label: 'Add'
        }
        const newElements = [...elements, newConnection] as Elements;
        setElements(newElements);
    };

    const getPathId = (x: number, y: number) => {
        const yPosition = y - CURSOR_HEIGHT;
        let maximumAreaY = 0;
        let pathId = ''
        nodes.forEach(node => {
            if (node.type !== 'path') {
                return;
            }
            const pathBoundaries = {
                xEnd: node.position.x + Number(node.style?.width),
                yEnd: node.position.y + Number(node.style?.height) // maybe get it by widget/node type
            };
            if (x >= node.position.x && x <= pathBoundaries.xEnd && yPosition >= node.position.y && yPosition <= pathBoundaries.yEnd && maximumAreaY < node.position.y) {
                pathId = node.id;
                maximumAreaY = node.position.y;
            }
        });
        return pathId || MAIN_PATH_ID;
    }

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const type = event.dataTransfer.getData('application/reactflow');
        if (!type) {
            return;
        }
        console.log('ondrop: ', event.clientX, event.clientY, reactFlowInstance);
        const projected = reactFlowInstance?.project({x: event.clientX, y: event.clientY });
        const pathId = getPathId(projected?.x || 0, projected?.y || 0);
        // console.log('onDrop pathId: ', pathId);
        const { nodeAboveIndex, nodeBelowIndex } = getSurroundingNodesIndex(projected?.x || 0, projected?.y || 0, pathId);
        if (nodeAboveIndex === -1 || nodeBelowIndex === -1) {
            console.log('DROP FAILED');
            return;
        }
        const newNode = createNewWidgetNode(type, pathId);
        const newConnections = createNewNodeConnections(nodeAboveIndex, nodeBelowIndex, newNode);
        const newNodes = [...nodes, newNode];
        const layoutedElements = getLayoutedElements(newNodes, newConnections);
        // console.log('layoutedElements: ', layoutedElements);
        setNodes(newNodes);
        setEdges(newConnections);
        setElements(layoutedElements);
        // const elementAboveIndex = getElementAboveIndex(event.clientX, event.clientY);
        // const newNode = createNewWidgetNode(type);
        // if (!newNode) {
        //     return;
        // }
        // const newConnections = createNewNodeConnections(elementAboveIndex, newNode)
        // const newNodes = getNodesWithNewPositions(elementAboveIndex + 1, [newNode]);
        // setNodes(newNodes);
        // setEdges(newConnections);
        // setElements([...newNodes, ...newConnections]);
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onNodeDragStart = (event: React.MouseEvent<Element, MouseEvent>, node: Node<any>) => console.log('onNodeDragStart: ', event, node);

    const onNodeDragStop = (event: React.MouseEvent<Element, MouseEvent>, node: Node<any>) => console.log('onNodeDragStop: ', event, node);

    const getLayoutedElements  = (nodes: Node<INodeData>[], edges: Edge[]) => {
        const graph = new dagre.graphlib.Graph({ compound: true });
        graph.setDefaultEdgeLabel(() => ({}));
        graph.setGraph({ rankdir: 'TB', ranksep: 70 });
        let parentId = '';
        if (!graph) {
            return [];
        }
        nodes.forEach(el => {
            graph.setNode(el.id, { width: el.data?.nodeWidth, height: WIDGET_HEIGHT, label: el.id });
            if (el.data && el.data?.path !== MAIN_PATH_ID) {
                graph.setParent(el.id, el.data.path);
                parentId = el.data.path;
            }
        });
        edges.forEach(el => {
            if (el.target === parentId || el.source === parentId) {
                return;
            }
            graph.setEdge(el.source, el.target, { label: el.id })
        });
        dagre.layout(graph);

        const mostLeftOnRight = nodes.reduce((acc, val) => {
            if (val.id.startsWith('r')) {
                return acc;
            }
            const elX = graph.node(val.id).x;
            return elX > acc ? elX : acc;
        }, 0);

        console.log('mostLeftOnRight, ', mostLeftOnRight); 

        const start = graph.node('start').x;
        console.log('start: ', start);
        const move = mostLeftOnRight - start + 400;

        const mostChars = nodes.reduce((acc, val) => {
            if (val.id.startsWith('r')) {
                return acc;
            }
            if (val.id.length > acc) {
                return val.id.length;
            }
            return acc;
        }, 1);
        console.log('mostChars: ', mostChars);

        return [...nodes, ...edges].map(el => {
            if (isNode(el)) {
                const nodeWithPosition = graph.node(el.id);
                if (el.type === 'path') {
                    el.style = {
                        width: nodeWithPosition.width,
                        height: nodeWithPosition.height
                    };
                }
                if (isNode(el)) {
                    el.position = {
                        x: el.id.startsWith('l')
                        ? nodeWithPosition.x - move // + ((mostChars - el.id.length) * 225)
                        : nodeWithPosition.x - (el.data ? el.data?.nodeWidth / 2 : 100 / 2) + Math.random() / 1000,
                        // x: nodeWithPosition.x - nodeWithPosition.width / 2 + Math.random() / 1000,
                        y: nodeWithPosition.y
                    }
                }
            }
            return el;
        });
    };

    useEffect(() => {
        const layoutedElements = getLayoutedElements(nodes, edges);
        setElements(layoutedElements);
    }, [reactFlowInstance]);

    return (
        <div className="flow-page">
            {showWorkflowOptions && <Options position={optionsStyles} onOptionSelect={onOptionSelect} />}
            <div className="react-flow-area" ref={reactFlowWrapper}>
                <ReactFlow
                    zoomOnDoubleClick={false}
                    zoomOnScroll={false}
                    elements={elements}
                    nodeTypes={{
                        custom: CustomNode,
                        path: FlowPath,
                        if: IfNode,
                        loop: LoopNode,
                        widget1: Widget1,
                        widget2: Widget2
                    }}
                    edgeTypes={{
                        custom: CustomEdge
                    }}
                    onElementClick={clickHandler}
                    onLoad={onLoadHandler}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeDragStart={onNodeDragStart}
                    onNodeDragStop={onNodeDragStop}
                    minZoom={0.3}
                >
                    <MiniMap
                        nodeBorderRadius={2}
                    />
                    <Controls />
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={20}
                        size={1}
                    />
                </ReactFlow>
            </div>
            <Sidebar />
        </div>
    )
}
