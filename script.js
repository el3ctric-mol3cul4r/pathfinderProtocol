function createGrid() {
    const rows = parseInt(document.getElementById("y").value);
    const columns = parseInt(document.getElementById("x").value);
    const grid = document.getElementById("grid");

    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${columns}, 40px)`;

    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const row = Math.floor(i/columns);
        const column = i % columns;

        cell.dataset.row = row;
        cell.dataset.column = column;

        grid.appendChild(cell);
    }

}

function colorCells(x, y, className) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        if (
            parseInt(cell.dataset.column) === x && parseInt(cell.dataset.row) === y 
        ) {
            cell.classList.add(className);
        }
    })

}

document.querySelector("#startcontrols button").addEventListener("click", () => {
    const x = parseInt(document.getElementById("xStart").value);
    const y = parseInt(document.getElementById("yStart").value);

    colorCells(x, y, "start");
})

function bfs(graph, start) {
  const queue = [start];
  const visited = new Set();
  const result = [];

  while (queue.length) {
    const vertex = queue.shift();

    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of graph[vertex]) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// bfs(grid, start)