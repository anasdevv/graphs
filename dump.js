const weightedGraph = new WeightedGraph();

// Add vertices
weightedGraph.addVertex('A');
weightedGraph.addVertex('B');
weightedGraph.addVertex('C');
weightedGraph.addVertex('D');
weightedGraph.addVertex('E');
weightedGraph.addVertex('F');

// Add weighted edges
weightedGraph.addEdge('A', 'B', 2);
weightedGraph.addEdge('A', 'C', 5);
weightedGraph.addEdge('B', 'D', 7);
weightedGraph.addEdge('C', 'D', 1);
weightedGraph.addEdge('C', 'E', 4);
weightedGraph.addEdge('D', 'E', 3);
weightedGraph.addEdge('E', 'F', 6);

weightedGraph.DLS('A', 1);
// Print the weighted graph
// weightedGraph.printGraph();
// weightedGraph.BFS();
// console.log('DFS');
// weightedGraph.DFS();
// weightedGraph.IDDLS('A', 2);

function GBFS(graph, startNode, goalNode, heuristicFunction) {
  // Open list for storing nodes to be explored
  const openList = [];

  // Closed list for storing visited nodes
  const closedList = [];

  // Add the starting node to the open list with its heuristic value
  openList.push({ node: startNode, f: heuristicFunction(startNode) });

  while (openList.length > 0) {
    // Find the node with the lowest heuristic value in the open list
    const currentNode = openList.reduce((minNode, currNode) => {
      return currNode.f < minNode.f ? currNode : minNode;
    }, openList[0]);

    // Remove the current node from the open list and add it to the closed list
    openList.splice(openList.indexOf(currentNode), 1);
    closedList.push(currentNode.node);

    // Check if the goal node is found
    if (currentNode.node === goalNode) {
      return reconstructPath(closedList);
    }

    // Get the neighbors of the current node
    const neighbors = graph[currentNode.node];

    // Loop through each neighbor
    for (const neighbor of neighbors) {
      if (closedList.includes(neighbor)) {
        continue;
      }

      const tentativeGScore =
        currentNode.f + graph.weight(currentNode.node, neighbor);
      let isInOpenList = false;

      // Check if the neighbor is already in the open list
      for (const openNode of openList) {
        if (openNode.node === neighbor) {
          isInOpenList = true;
          if (tentativeGScore < openNode.f) {
            openNode.f = tentativeGScore;
          }
          break;
        }
      }

      // If the neighbor is not in the open list or has a lower tentative g-score, add it to the open list with its heuristic value
      if (!isInOpenList) {
        openList.push({
          node: neighbor,
          f: tentativeGScore + heuristicFunction(neighbor),
        });
      }
    }
  }

  // No path found
  return null;
}

function reconstructPath(closedList) {
  const path = [];
  let currentNode = closedList[closedList.length - 1];

  while (currentNode) {
    path.push(currentNode.node);
    currentNode = findParent(closedList, currentNode);
  }

  return path.reverse();
}

function findParent(closedList, node) {
  for (const item of closedList) {
    if (graph.weight(item, node) > 0) {
      return item;
    }
  }
  return null;
}

// Example usage:

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: ['G'],
  E: ['H'],
  F: [],
  G: [],
  H: [],
};

const startNode = 'A';
const goalNode = 'H';

const heuristicFunction = (node) => {
  // Replace this with your specific heuristic function
  switch (node) {
    case 'A':
      return 5;
    case 'B':
      return 4;
    case 'C':
      return 6;
    case 'D':
      return 3;
    case 'E':
      return 2;
    case 'F':
      return 1;
    case 'G':
      return 0;
    case 'H':
      return 0;
    default:
      return 0;
  }
};

const path = GBFS(graph, startNode, goalNode, heuristicFunction);

console.log(path); // Output: ["A", "B", "D", "G", "H"]

function GBFS(startNode, goalNode) {
  const openList = [];

  const closedList = [];

  openList.push({ node: startNode, cost: heuristicFunction(startNode) });

  while (openList.length > 0) {
    const currentNode = openList.reduce((minNode, currNode) => {
      return currNode.cost < minNode.cost ? currNode : minNode;
    }, openList[0]);

    openList.splice(openList.indexOf(currentNode), 1);
    closedList.push(currentNode.node);

    if (currentNode.node === goalNode) {
      return currentNode.cost; // Return the cost of the found path
    }

    const neighbors = this.[currentNode.node];

    for (const neighbor of neighbors) {
      if (closedList.includes(neighbor)) {
        continue;
      }

      const tentativeCost =
        currentNode.cost + graph.weight(currentNode.node, neighbor);
      let isInOpenList = false;

      // Check if the neighbor is already in the open list
      for (const openNode of openList) {
        if (openNode.node === neighbor) {
          isInOpenList = true;
          if (tentativeCost < openNode.cost) {
            openNode.cost = tentativeCost;
          }
          break;
        }
      }

      // If the neighbor is not in the open list or has a lower tentative cost, add it to the open list with its heuristic value
      if (!isInOpenList) {
        openList.push({
          node: neighbor,
          cost: tentativeCost + heuristicFunction(neighbor),
        });
      }
    }
  }

  // No path found
  return null;
}

const cost = GBFS(graph, startNode, goalNode, heuristicFunction);

console.log(cost); // Output: 7 (cost of the path A -> B -> D -> G -> H)
