import React from 'react';
import TreeNode from './TreeNode';

const NodeTree = () => {
  const treeData = {
    name: 'Courses',
    children: [
      {
        name: 'Flutter',
        children: [
          { name: '3', children: [] },
          { name: '6', children: [] },
          { name: '12', children: [] },
        ],
      },
      {
        name: 'Mern',
        children: [
          { name: '3', children: [] },
          { name: '6', children: [] },
          { name: '12', children: [] },
        ],
      },
      {
        name: 'Python',
        children: [
          { name: '3', children: [] },
          { name: '6', children: [] },
          { name: '12', children: [] },
        ],
      },
      {
        name: 'Java',
        children: [
          { name: '3', children: [] },
          { name: '6', children: [] },
          { name: '12', children: [] },
        ],
      },
      {
        name: 'Data Science',
        children: [
          { name: '3', children: [] },
          { name: '6 ', children: [] },
          { name: '1', children: [] },
        ],
      },
     
    //   {
    //     name: 'Mern',
    //     children: [
    //       { name: 'Node 2.1', children: [] },
    //       {
    //         name: 'Node 2.2',
    //         children: [
    //           { name: 'Node 2.2.1', children: [] },
    //           { name: 'Node 2.2.2', children: [] },
    //         ],
    //       },
    //     ],
    //   },
    ],
  };

  return (
    <div style={{ textAlign: 'center', background: 'linear-gradient(90deg, rgba(71,85,105,1) 0%, rgba(16,97,139,1) 49%, rgba(71,85,105,1) 87%)' , borderRadius:"10px" }}>
      <TreeNode data={treeData} isRoot />
    </div>
  );
  
};

export default NodeTree;
