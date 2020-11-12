import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getData(state, id) {
    return state[id] || ''
}

function createCell({colState, dataState, stylesState}, row) {
    return function(_, col) {
        const width = getWidth(colState, col + 1)
        const id = `${row + 1}:${col + 1}`
        const content = getData(dataState, id)
        const style = toInlineStyles({
            ...defaultStyles,
            ...stylesState[id]
        })
        return `
        <div 
            class="cell" 
            data-col="${col + 1}" 
            data-id="${id}"
            data-type="cell"
            data-value="${content || ''}"
            style="${style}; width: ${width}"
            contenteditable
            >
            ${parse(content) || ''}
        </div>
    `
    }
}

function createCol({col, index, width}) {
    return `
        <div 
            class="column" 
            data-col="${index + 1}" 
            data-type="resizable" 
            style="width: ${width}"
        >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(rowInfo, content, state) {
    const resizer = rowInfo
        ? '<div data-resize="row" class="row-resize"></div>'
        : ''
    const height = getHeight(state, rowInfo)
    return `
        <div 
            class="row" 
            data-row="${rowInfo}" 
            data-type="resizable" 
            style="height: ${height}"
        >
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

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state, index + 1)
        }
    }
}

export function createTable(
    rowsCount = 30,
    {
        dataState = {},
        rowState = {},
        colState = {},
        stylesState = {}
    }) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(colState))
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols, {}))

    for (let i = 0; i < rowsCount; i++) {
        const rowCells = new Array(colsCount)
            .fill('')
            .map(createCell({colState, dataState, stylesState}, i))
            .join('')
        const rowNumber = i + 1
        rows.push(createRow(rowNumber, rowCells, rowState))
    }
    return rows.join('')
}
