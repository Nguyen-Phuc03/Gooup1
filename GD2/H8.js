const organizationTree = {
    name: "CEO",
    children: [
      {
        name: "CFO",
        children: [
          {
            name: "Finance Manager",
            children: [
              { name: "Senior Accountant" },
              { name: "Junior Accountant" },
            ],
          },
          {
            name: "Investment Manager",
            children: [
              { name: "Financial Analyst I" },
              { name: "Financial Analyst II" },
            ],
          },
        ],
      },
      {
        name: "CTO",
        children: [
          {
            name: "Engineering Manager",
            children: [
              { name: "Lead Developer" },
              { name: "Senior Developer" },
              { name: "Junior Developer" },
            ],
          },
          {
            name: "QA Manager",
            children: [
              { name: "Lead QA Engineer" },
              { name: "QA Engineer I" },
              { name: "QA Engineer II" },
            ],
          },
        ],
      },
      {
        name: "COO",
        children: [
          {
            name: "Operations Manager",
            children: [{ name: "HR Manager" }, { name: "Office Coordinator" }],
          },
          {
            name: "Customer Relations Manager",
            children: [
              { name: "Customer Support Specialist I" },
              { name: "Customer Support Specialist II" },
            ],
          },
        ],
      },
    ],
  };
  
  let idCounter = 1;

function convertToFlatList(node, path = "", parentId = null, flatList = []) {
    const currentId = idCounter++;
    const currentPath = path ? `${node.name} > ${path}` : node.name;

    flatList.push({
        id: currentId,
        name: node.name,
        position: currentPath,
        parentId: parentId,
    });

    if (node.children) {
        node.children.forEach(child => {
            convertToFlatList(child, currentPath, currentId, flatList);
        });
    }
    return flatList;
}

const flatList = convertToFlatList(organizationTree);
console.log(flatList);