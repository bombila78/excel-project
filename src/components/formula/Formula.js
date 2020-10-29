import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
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
        this.$on('table:new-select', text => {
            this.$formula.text(text)
        })
        this.$on('table:input', text => {
            this.$formula.text(text)
        })
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
