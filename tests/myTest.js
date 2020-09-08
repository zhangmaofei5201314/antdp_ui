const treeData = [
    
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];
// console.log(treeData);
const valueMap = {};
const a=treeData[0].children.map(({value,children})=>{
    // console.log(value)
    const node = (valueMap[value] = {
        // parent,
        value
      });
    return node;
    
})

// console.log(a);

// valueMap['0-0']={parent:'',value:'0-0'}

// console.log(valueMap);



function loops(list, parent) {
    return (list || []).map(({ children, value }) => {
      const node = (valueMap[value] = {
        parent,
        value
      });
      node.children = loops(children, node);
      return node;
    });
  }
  
  loops(treeData);

  console.log('棕树',valueMap);


  function getPath(value) {
    const path = [];
    let current = valueMap[value];
    while (current) {
      path.unshift(current.value);
      current = current.parent;
    }
    return path;
  }

  function getPath1(value) {
    const path = [];
    value.map(val=>{
        console.log('val',val);
        let current = valueMap[val];
        while (current) {
          path.unshift(current.val);
          current = current.parent;
        }
    })
    
    return path;
  }
  const path = [];
//   let current = valueMap['0-1-0'];
//   path.unshift(current.value);
//   path.unshift(current.parent);
// console.log('锁定',getPath(['0-1-0','0-1-1']));

['0-1-0','0-1-1'].map(value=>{
    let a = getPath(value);
    console.log(value,a);
    path.push(...a)
})

console.log('path',Array.from(new Set(path)));









