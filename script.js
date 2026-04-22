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

        grid.appendChild(cell);
    }

}

function plotPoints() {
    const startX = parseInt(document.getElementById("startX".value));
    const startY = parseInt(document.getElementById("startY".value));
    const endX = parseInt(document.getElementById("endX".value));
    const endY = parseInt(document.getElementById("endY".value));
}