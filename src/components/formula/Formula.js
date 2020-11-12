import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="formula-info">fx</div>
            <div
                    id="formula"
                    class="formula-input"
                    contenteditable
                    spellcheck="false"
            >
                
            </div>
            `
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')
        this.$on('table:new-select', $cell => {
            const res = $cell.getData('value')
            this.$formula.text(res)
        })
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const KEYS = ['Enter', 'Tab']
        if (KEYS.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
