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

        cell.addEventListener("click", () => {
            if (cell.classList.contains("start") || cell.classList.contains("end")) {
                return;
            }

            cell.classList.toggle("wall");
        })

        grid.appendChild(cell);
    }


}


function colorCells(x, y, className) {
    document.querySelectorAll(`.${className}`).forEach(cell => {
        cell.classList.remove(className);
    })
    const cell = document.querySelector(`.cell[data-row="${y}"][data-column="${x}"]`);
    console.log(document.querySelector(`.cell[data-row="${y}"][data-column="${x}"]`));
    if (cell) {
        cell.classList.add(className);
    }
}


document.querySelector("#startcontrols button").addEventListener("click", () => {
    const x = parseInt(document.getElementById("xStart").value) - 1;
    const y = parseInt(document.getElementById("yStart").value) - 1;

    colorCells(x, y, "start");
})


document.querySelector("#endcontrols button").addEventListener("click", () => {
    const x = parseInt(document.getElementById("xEnd").value) - 1;
    const y = parseInt(document.getElementById("yEnd").value) - 1;

    colorCells(x, y, "end");
})


function bfs(startRow, startColumn, endRow, endColumn) {
    const rows = parseInt(document.getElementById("y").value);
    const columns = parseInt(document.getElementById("x").value);
    const queue = [[startRow, startColumn]];
    const parent = Array.from({ length: rows }, () =>
    Array(columns).fill(null));

    const visited = Array.from({ length: rows }, () =>
    Array(columns).fill(false)
    );

    visited[startRow][startColumn] = true;

    const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
    ];

    while (queue.length) {
    const [r, c] = queue.shift();

    const cell = document.querySelector(
        `.cell[data-row="${r}"][data-column="${c}"]`
    );

    if (r === endRow && c === endColumn) {
    let path = [];
    let current = [r, c];


    while (current) {
        path.push(current);
        current = parent[current[0]][current[1]]; // ✅ FIXED
    }


    path.reverse();


    for (let [pr, pc] of path) {
        const pathCell = document.querySelector(
            `.cell[data-row="${pr}"][data-column="${pc}"]`
        );


        if (!pathCell.classList.contains("start") &&
            !pathCell.classList.contains("end")) {
            pathCell.classList.add("path");
        }
    }


    return;
}


    for (let [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < columns &&
        !visited[nr][nc]
        ) {
        const nextCell = document.querySelector(
            `.cell[data-row="${nr}"][data-column="${nc}"]`
        );

        if (nextCell.classList.contains("wall")) continue;

        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
        queue.push([nr, nc]);

        if (!nextCell.classList.contains("start") &&
        !nextCell.classList.contains("end") &&
        !nextCell.classList.contains("wall")) {
            nextCell.classList.add("visited");
        }
      }
    }
  }
}


document.getElementById("BFS").addEventListener("click", () => {
    const startRow = parseInt(document.getElementById("yStart").value) - 1;
    const startColumn = parseInt(document.getElementById("xStart").value) - 1;
    const endRow = parseInt(document.getElementById("yEnd").value) - 1;
    const endColumn = parseInt(document.getElementById("xEnd").value) - 1;
   
    bfs(startRow, startColumn, endRow, endColumn);
})


document.getElementById("A*").addEventListener("click", () => {
    document.getElementById("extra").innerHTML = "There's nothing here, sorry."
})
