import {range} from '@core/utils';

export function shouldResize(event) {
    return !!event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function parseCellId(id) {
    return {
        row: +id.split(':')[0],
        col: +id.split(':')[1]
    }
}

export function parseIdFromRowAndCol(rowNum, colNum) {
    return rowNum + ':' + colNum
}

export function matrix($target, $current) {
    const target = parseCellId($target.getData('id'))
    const current = parseCellId($current.getData('id'))

    const cols = range(target.col, current.col)
    const rows = range(target.row, current.row)

    return cols.reduce((acc, colNum) => {
        rows.forEach(rowNum => {
            acc.push(parseIdFromRowAndCol(rowNum, colNum))
        })
        return acc
    }, [])
}

export function nextSelector(key, {row, col}) {
    const initialRow = row
    const initialCol = col
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col--
            break
        case 'ArrowUp':
            row--
    }
    let id
    if (row < 1 || col < 1) {
        id = parseIdFromRowAndCol(initialRow, initialCol)
    } else {
        id = parseIdFromRowAndCol(row, col)
    }
    return `[data-id='${id}']`
}
