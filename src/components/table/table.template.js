const CODES = {
    A: 65,
    Z: 90
}

function createCell(content) {
    return `
    <div class="cell" contenteditable>${content}</div>
    `
}

function createCol(col) {
    return `
        <div class="column">${col}</div>
    `
}

function createRow(rowInfo, content) {
    return `
        <div class="row">
            <div class="row-info">${rowInfo ? rowInfo : ''}</div>
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
