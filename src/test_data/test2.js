export const nodes2 = [
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
      id: 'r11',
      type: 'custom',
      data: { label: 'r11', path: '1', nodeWidth: 400 },
      draggable: true,
      position: { x: 0, y: 0 }
  },
  {
      id: 'r12',
      type: 'custom',
      data: { label: 'r12', path: '1', nodeWidth: 400 },
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
    id: 'r111',
    type: 'custom',
    data: { label: 'r111', path: '1', nodeWidth: 400 },
    draggable: true,
    position: { x: 0, y: 0 }
},
{
    id: 'r112',
    type: 'custom',
    data: { label: 'r112', path: '1', nodeWidth: 400 },
    draggable: true,
    position: { x: 0, y: 0 }
}
];

export const edges2 = [
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
      id: 'er1-r11',
      source: 'r1',
      target: 'r11',
      type: 'smoothstep',
      label: 'Add'
  },
  {
      id: 'er1-r12',
      source: 'r1',
      target: 'r12',
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
    id: 'er11-r111',
    source: 'r11',
    target: 'r111',
    type: 'smoothstep',
    label: 'Add'
  },
  {
    id: 'er11-r112',
    source: 'r11',
    target: 'r112',
    type: 'smoothstep',
    label: 'Add'
  }
];
