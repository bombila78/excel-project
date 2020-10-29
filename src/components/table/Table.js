import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {
    isCell,
    matrix,
    nextSelector,
    parseCellId,
    shouldResize
} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }
    toHTML() {
        return createTable(20)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="1:1"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:new-select', this.selection.current.text())
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            const $current = this.selection.current
            if (event.shiftKey) {
                const $selectedCells = matrix($target, $current)
                    .map(id => this.$root.find(`[data-id='${id}']`))
                this.selection.selectGroup($selectedCells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const KEYS = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]

        const {key} = event

        if (KEYS.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = parseCellId(this.selection.current.getData('id'))
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target).text())
    }
}

