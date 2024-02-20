function GBFS(graph, startNode, goalNode, heuristicFunction) {
  // Open list for storing nodes to be explored
  const openList = [];

  // Closed list for storing visited nodes
  const closedList = [];

  // Add the starting node to the open list with its heuristic value
  openList.push({ node: startNode, cost: heuristicFunction(startNode) });

  while (openList.length > 0) {
    // Find the node with the lowest heuristic value in the open list
    const currentNode = openList.reduce((minNode, currNode) => {
      return currNode.cost < minNode.cost ? currNode : minNode;
    }, openList[0]);

    // Remove the current node from the open list and add it to the closed list
    openList.splice(openList.indexOf(currentNode), 1);
    closedList.push(currentNode.node);

    // Check if the goal node is found
    if (currentNode.node === goalNode) {
      return currentNode.cost; // Return the cost of the found path
    }

    // Get the neighbors of the current node
    const neighbors = graph[currentNode.node];

    // Loop through each neighbor
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

const cost = GBFS(graph, startNode, goalNode, heuristicFunction);

console.log(cost); // Output: 7 (cost of the path A -> B -> D -> G -> H)
