
document.addEventListener("DOMContentLoaded", () => {
    makeTableDraggable("dpsBody");
    makeTableDraggable("healerBody");
    makeTableDraggable("tankBody");
});

function addRow(tableId) {
    const tableBody = document.getElementById(tableId);
    const row = document.createElement("tr");

    // Crear la celda de prioridad (autonumérica)
    let priorityCell = document.createElement("td");
    priorityCell.classList.add("priority"); // Agregamos clase para identificarla fácilmente
    priorityCell.innerText = tableBody.children.length + 1;
    row.appendChild(priorityCell);

    // Crear las celdas editables (Nombre y Necesita)
    for (let i = 0; i < 2; i++) {
        let cell = document.createElement("td");
        cell.contentEditable = "true";
        cell.innerText = i === 0 ? "Nuevo Jugador" : "Escribe aquí...";
        row.appendChild(cell);
    }

    // Crear las celdas de puntos (Antigüedad, Reputación y Participación)
    for (let i = 0; i < 3; i++) {
        let cell = document.createElement("td");
        let input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.max = "1";
        input.value = "0";
        cell.appendChild(input);
        row.appendChild(cell);
    }

    // Hacer la fila arrastrable
    row.draggable = true;
    row.addEventListener("dragstart", dragStart);
    row.addEventListener("dragover", dragOver);
    row.addEventListener("drop", drop);

    tableBody.appendChild(row);
    updatePriorities(tableBody);
}

// Hacer que la tabla sea arrastrable
function makeTableDraggable(tableId) {
    const tableBody = document.getElementById(tableId);
    tableBody.addEventListener("dragstart", dragStart);
    tableBody.addEventListener("dragover", dragOver);
    tableBody.addEventListener("drop", (event) => drop(event, tableBody));
}

let draggedRow = null;

function dragStart(event) {
    draggedRow = event.target;
    event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event, tableBody) {
    event.preventDefault();
    if (event.target.tagName === "TD") {
        let targetRow = event.target.parentNode;
        if (draggedRow !== targetRow) {
            tableBody.insertBefore(draggedRow, targetRow.nextSibling);
            updatePriorities(tableBody);
        }
    }
}

// Función para actualizar los números de prioridad
function updatePriorities(tableBody) {
    let rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.querySelector(".priority").innerText = index + 1;
    });
}
