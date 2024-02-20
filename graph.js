class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
    this.queue.sort((a, b) => a.cost - b.cost);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
const heuristic = {
  Arad: 366,
  Bucharest: 0,
  Craiova: 160,
  Drobeta: 242,
  Eforie: 161,
  Fagaras: 176,
  Giurgiu: 77,
  Hirsova: 151,
  Iasi: 226,
  Lugoj: 244,
  Mehadia: 241,
  Neamt: 234,
  Oradea: 380,
  Pitesti: 100,
  'Rimnicu Vilcea': 193,
  Sibiu: 253,
  Timisoara: 329,
  Urziceni: 80,
  Vaslui: 199,
  Zerind: 374,
};
class WeightedGraph {
  constructor(init = []) {
    this.adjList = new Map(init);
  }

  addVertex(vertex) {
    this.adjList.set(vertex, []);
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjList.get(vertex1).push({ node: vertex2, weight });
    this.adjList.get(vertex2).push({ node: vertex1, weight });
  }
  weight(node1, node2) {
    const neighbors = this.adjList.get(node1);
    if (neighbors) {
      const neighbor = neighbors.find((n) => n.node === node2);
      if (neighbor) {
        return neighbor.weight;
      }
    }
    return -1;
  }
  getHeight(startNode) {
    const visited = this.getVisitedObject();
    let maxHeight = 0;

    const dfs = (node, depth) => {
      visited[node] = true;
      maxHeight = Math.max(maxHeight, depth);

      const neighbors = this.adjList.get(node);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited[neighbor.node]) {
            dfs(neighbor.node, depth + 1);
          }
        }
      }
    };

    dfs(startNode, 0);

    return maxHeight;
  }
  printGraph() {
    for (const [vertex, neighbors] of this.adjList) {
      const neighborString = neighbors
        .map(({ node, weight }) => `${node} (${weight})`)
        .join(', ');
      console.log(`${vertex} -> ${neighborString}`);
    }
  }
  getVisitedObject() {
    const visited = {};
    for (const key of this.adjList.keys()) {
      visited[key] = false;
    }
    return visited;
  }
  getNodes() {
    return this.adjList.keys();
  }
  BFS(root, goal) {
    if (!root || !this.adjList.get(root)) {
      console.log('no root specified or found , taking first vertex as root');
      root = Array.from(this.adjList.keys())[0];
    }
    const visited = this.getVisitedObject();
    const q = [{ node: root, cost: 0 }];
    while (q.length > 0) {
      let { node, cost, parent } = q.shift();
      if (node === goal) {
        return { cost };
      }
      if (!visited[node]) {
        visited[node] = true;
        console.log(`Node : ${node} - Cost : ${cost}`);
        const neighbors = this.adjList.get(node);
        q.push(
          ...neighbors.map((n) => ({
            node: n.node,
            cost: cost + n.weight,
          }))
        );
      }
    }
  }
  DFS(root, goal, depth = null) {
    if (!root || !this.adjList.get(root)) {
      console.log('no root specified or found , taking first vertex as root');
      root = Array.from(this.adjList.keys())[0];
    }
    // can aslo use Set here  , to keep track of visited
    const visited = this.getVisitedObject();
    const stack = [
      {
        node: root,
        cost: 0,
      },
    ];
    let d = 0;
    const isDLS = depth !== null ? () => d < depth : () => true;
    while (stack.length > 0 && isDLS()) {
      const { node, cost } = stack.pop();
      if (!visited[node]) {
        visited[node] = true;
        console.log(`Node : ${node} - Cost : ${cost}`);
        const neighbors = this.adjList.get(node);
        stack.push(
          ...neighbors.map((n) => ({
            node: n.node,
            cost: n.weight + cost,
          }))
        );
        d += 1;
      }
    }
  }
  DLS(root, goal, depth) {
    if (!root || !this.adjList.get(root)) {
      console.log('no root specified or found , taking first vertex as root');
      root = Array.from(this.adjList.keys())[0];
    }
    // can aslo use Set here  , to keep track of visited
    const visited = this.getVisitedObject();
    const stack = [
      {
        node: root,
        cost: 0,
        d: 0,
      },
    ];
    while (stack.length > 0) {
      const { node, cost, d } = stack.pop();
      if (!visited[node]) {
        visited[node] = true;
        console.log(`Node : ${node} - Cost : ${cost}`);
        if (node === goal) return { cost };
        if (d <= depth) {
          const neighbors = this.adjList.get(node);
          stack.push(
            ...neighbors.map((n) => ({
              node: n.node,
              cost: n.weight + cost,
              d: d + 1,
            }))
          );
        }
      }
    }
    return null;
  }
  IDDLS(root, goal) {
    const depth = this.getHeight(root);
    for (let i = 1; i <= depth; i++) {
      console.log(`depth ${i}`);
      const res = this.DLS(root, goal, i);
      if (res?.cost) {
        return res;
      }
    }
  }

  GBFS(startNode, goalNode) {
    const openList = [];

    const closedList = [];

    const path = [];

    openList.push({ node: startNode, cost: 0, parent: null });

    while (openList.length > 0) {
      const currentNode = openList.reduce((minNode, currNode) => {
        return currNode.cost < minNode.cost ? currNode : minNode;
      }, openList[0]);

      openList.splice(openList.indexOf(currentNode), 1);
      closedList.push(currentNode.node);
      if (currentNode.node === goalNode) {
        let actualCost = 0;
        let current = currentNode;
        while (current) {
          path.unshift(current.node);
          if (current.parent) {
            actualCost += this.weight(current.parent.node, current.node);
          }
          current = current.parent;
        }
        return { path, actualCost };
      }

      const neighbors = this.adjList.get(currentNode.node);
      if (!neighbors) continue;
      // Loop through each neighbor
      for (const neighbor of neighbors) {
        if (closedList.includes(neighbor)) {
          continue;
        }

        const tentativeCost =
          currentNode.cost + this.weight(currentNode.node, neighbor.node);
        let isInOpenList = false;

        for (const openNode of openList) {
          if (openNode.node === neighbor.node) {
            isInOpenList = true;
            if (tentativeCost < openNode.cost) {
              openNode.cost = tentativeCost;
              openNode.parent = currentNode; // Update parent for path reconstruction
            }
            break;
          }
        }

        if (!isInOpenList) {
          openList.push({
            node: neighbor.node,
            cost: tentativeCost + heuristic[neighbor.node],
            parent: currentNode,
          });
        }
      }
    }
  }
  UCS(startNode, goalNode) {
    const visited = {};
    const priorityQueue = new PriorityQueue();
    const cost = {};
    const parent = {};

    for (const vertex of this.adjList.keys()) {
      cost[vertex] = Infinity;
      parent[vertex] = null;
    }

    priorityQueue.enqueue({ node: startNode, cost: 0 });
    cost[startNode] = 0;

    while (!priorityQueue.isEmpty()) {
      const { node, cost: costSoFar } = priorityQueue.dequeue();
      if (node === goalNode)
        return {
          path: this.reconstructPath(parent, goalNode),
          cost: costSoFar,
        };
      if (!visited[node]) {
        visited[node] = true;

        const neighbors = this.adjList.get(node);

        if (neighbors) {
          for (const neighbor of neighbors) {
            const newCost = costSoFar + neighbor.weight;
            if (newCost < cost[neighbor.node]) {
              cost[neighbor.node] = newCost;
              parent[neighbor.node] = node; // Update parent for path reconstruction
              priorityQueue.enqueue({ node: neighbor.node, cost: newCost });
            }
          }
        }
      }
    }
    return null;
  }
  reconstructPath(parent, goalNode) {
    const path = [];
    let current = goalNode;
    while (current) {
      path.unshift(current);
      current = parent[current];
    }
    return path;
  }
}

const romaniaMap = new WeightedGraph([
  [
    'Arad',
    [
      { node: 'Zerind', weight: 75 },
      { node: 'Timisoara', weight: 118 },
      { node: 'Sibiu', weight: 140 },
    ],
  ],
  [
    'Zerind',
    [
      { node: 'Oradea', weight: 71 },
      { node: 'Arad', weight: 75 },
    ],
  ],
  [
    'Oradea',
    [
      { node: 'Zerind', weight: 71 },
      { node: 'Sibiu', weight: 151 },
    ],
  ],
  [
    'Timisoara',
    [
      { node: 'Arad', weight: 118 },
      { node: 'Lugoj', weight: 111 },
    ],
  ],
  [
    'Lugoj',
    [
      { node: 'Timisoara', weight: 111 },
      { node: 'Mehadia', weight: 70 },
    ],
  ],
  [
    'Mehadia',
    [
      { node: 'Lugoj', weight: 70 },
      { node: 'Drobeta', weight: 75 },
    ],
  ],
  [
    'Drobeta',
    [
      { node: 'Mehadia', weight: 75 },
      { node: 'Craiova', weight: 120 },
    ],
  ],
  [
    'Craiova',
    [
      { node: 'Drobeta', weight: 120 },
      { node: 'Rimnicu Vilcea', weight: 146 },
      { node: 'Pitesti', weight: 138 },
    ],
  ],
  [
    'Rimnicu Vilcea',
    [
      { node: 'Craiova', weight: 146 },
      { node: 'Sibiu', weight: 80 },
      { node: 'Pitesti', weight: 97 },
    ],
  ],
  [
    'Pitesti',
    [
      { node: 'Craiova', weight: 138 },
      { node: 'Rimnicu Vilcea', weight: 97 },
      { node: 'Bucharest', weight: 101 },
    ],
  ],
  [
    'Sibiu',
    [
      { node: 'Arad', weight: 120 },
      { node: 'Rimnicu Vilcea', weight: 80 },
      { node: 'Fagaras', weight: 99 },
    ],
  ],
  [
    'Fagaras',
    [
      { node: 'Sibiu', weight: 99 },
      { node: 'Bucharest', weight: 211 },
    ],
  ],
  [
    'Bucharest',
    [
      { node: 'Fagaras', weight: 211 },
      { node: 'Giurgiu', weight: 90 },
      { node: 'Urziceni', weight: 85 },
      { node: 'Pitesti', weight: 101 },
    ],
  ],
  ['Giurgiu', [{ node: 'Bucharest', weight: 90 }]],
  [
    'Urziceni',
    [
      { node: 'Bucharest', weight: 85 },
      { node: 'Hirsova', weight: 90 },
      { node: 'Vaslui', weight: 142 },
    ],
  ],
  [
    'Hirsova',
    [
      { node: 'Urziceni', weight: 90 },
      { node: 'Eforie', weight: 86 },
    ],
  ],
  ['Eforie', [{ node: 'Hirsova', weight: 86 }]],
  [
    'Vaslui',
    [
      { node: 'Urziceni', weight: 142 },
      { node: 'Iasi', weight: 92 },
    ],
  ],
  [
    'Iasi',
    [
      { node: 'Vaslui', weight: 92 },
      { node: 'Neamt', weight: 87 },
    ],
  ],
  ['Neamt', [{ node: 'Iasi', weight: 87 }]],
]);

let root = process.argv[2];
if (!root) {
  console.log('root not specified using Arad as root');
  root = 'Arad';
}
let goal = process.argv[3];
if (!goal) {
  console.log('goal not specified using Bucharest as goal');
  goal = 'Bucharest';
}

const nodes = romaniaMap.getNodes();
if (!root in nodes) {
  console.log('Invalid ');
  throw new Error(`Invalid node please pick node for ${JSON.stringify(nodes)}`);
}
if (!goal in nodes) {
  console.log('Invalid ');
  throw new Error(`Invalid node please pick goal for ${JSON.stringify(nodes)}`);
}
console.log('IDDLS');
console.log(romaniaMap.IDDLS(root, goal));
console.log('BFS');

console.log(romaniaMap.BFS(root, goal));
console.log('GBFS');

console.log(romaniaMap.GBFS(root, goal));
console.log('UCS');

console.log(romaniaMap.UCS(root, goal));

//UCS is best for this
