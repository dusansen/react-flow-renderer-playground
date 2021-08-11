export const nodes3 = [
  {
      id: 'start', 
      type: 'custom',
      data: { label: 'Start', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'l1',
      type: 'custom',
      data: { label: 'l1', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'r1',
      type: 'custom',
      data: { label: 'r1', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'l11',
      type: 'custom',
      data: { label: 'l11', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'l12',
      type: 'custom',
      data: { label: 'l12', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'l121',
      type: 'custom',
      data: { label: 'l121', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'l122',
      type: 'custom',
      data: { label: 'l122', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
    id: 'l1211',
    type: 'custom',
    data: { label: 'l1211', path: '1', nodeWidth: 400 },
    draggable: true,
    position: { x: 0, y: 0 }
  },
  {
    id: 'l1221',
    type: 'custom',
    data: { label: 'l1221', path: '1', nodeWidth: 400 },
    draggable: true,
    position: { x: 0, y: 0 }
  },
  {
    id: 'l1222',
    type: 'custom',
    data: { label: 'l1222', path: '1', nodeWidth: 400 },
    draggable: true,
    position: { x: 0, y: 0 }
  },
  {
    id: 'l12221',
    type: 'custom',
    data: { label: 'l12221', path: '1', nodeWidth: 400 },
    draggable: true,
    position: { x: 0, y: 0 }
  },
  {
    id: 'l12222',
    type: 'custom',
    data: { label: 'l12222', path: '1', nodeWidth: 400 },
    draggable: true,
    position: { x: 0, y: 0 }
  }
];

export const edges3 = [
  {
      id: 'estart-l1',
      source: 'start',
      target: 'l1',
      type: 'smoothstep',
      label: 'Add'
  },
  {
      id: 'estart-r1',
      source: 'start',
      target: 'r1',
      type: 'smoothstep',
      label: 'Add'
  },
  {
      id: 'el1-l11',
      source: 'l1',
      target: 'l11',
      type: 'smoothstep',
      label: 'Add'
  },
  {
      id: 'el1-l12',
      source: 'l1',
      target: 'l12',
      type: 'smoothstep',
      label: 'Add'
  },
  {
      id: 'el12-l121',
      source: 'l12',
      target: 'l121',
      type: 'smoothstep',
      label: 'Add'
  },
  {
      id: 'el12-l122',
      source: 'l12',
      target: 'l122',
      type: 'smoothstep',
      label: 'Add'
  },
  {
    id: 'el121-l1211',
    source: 'l121',
    target: 'l1211',
    type: 'smoothstep',
    label: 'Add'
  },
  {
    id: 'el122-ll1221',
    source: 'l122',
    target: 'l1221',
    type: 'smoothstep',
    label: 'Add'
  },
  {
    id: 'el122-ll1222',
    source: 'l122',
    target: 'l1222',
    type: 'smoothstep',
    label: 'Add'
  },
  {
    id: 'el1222-l12221',
    source: 'l1222',
    target: 'l12221',
    type: 'smoothstep',
    label: 'Add'
  },
  {
    id: 'el1222-l12222',
    source: 'l1222',
    target: 'l12222',
    type: 'smoothstep',
    label: 'Add'
  }
];
