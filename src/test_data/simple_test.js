export const NODES = [
  {
      id: 'start', 
      type: 'initial',
      data: { label: 'Start', path: '1', nodeWidth: 136, showTarget: false },
      draggable: false,
      position: { x: 0, y: 0 }
  },
  {
    id: 'placeholder', 
    type: 'placeholder',
    data: { label: 'Start', path: '1', nodeWidth: 16 },
    draggable: false,
    position: { x: 0, y: 0 }
  },
  {
      id: 'end',
      type: 'initial',
      data: { label: 'End', path: '1', nodeWidth: 136, showSource: false },
      draggable: false,
      position: { x: 0, y: 0 }
  }
];

export const EDGES = [
  {
      id: 'estart-placeholder',
      source: 'start',
      target: 'placeholder',
      type: 'smoothstep'
  },
  {
    id: 'eplaceholder-end',
    source: 'placeholder',
    target: 'end',
    type: 'smoothstep'
}
];
