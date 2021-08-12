export const NODES = [
  {
      id: 'start', 
      type: 'initial',
      data: { label: 'Start', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'end',
      type: 'initial',
      data: { label: 'End', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  }
];

export const EDGES = [
  {
      id: 'estart-end',
      source: 'start',
      target: 'end',
      type: 'smoothstep',
      label: 'Add'
  }
];
