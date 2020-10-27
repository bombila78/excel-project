const CODES = {
    A: 65,
    Z: 90
}

function createCell(content, index) {
    return `
    <div class="cell" data-col="${index + 1}" contenteditable>${content}</div>
    `
}

function createCol(col, index) {
    return `
        <div class="column" data-col="${index + 1}" data-type="resizable">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(rowInfo, content) {
    const resizer = rowInfo
        ? '<div data-resize="row" class="row-resize"></div>'
        : ''
    return `
        <div class="row" data-row="${rowInfo}" data-type="resizable">
            <div class="row-info">
                ${rowInfo ? rowInfo : ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 30) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        const rowCells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')
        const rowNumber = i + 1
        rows.push(createRow(rowNumber, rowCells))
    }
    return rows.join('')
}
