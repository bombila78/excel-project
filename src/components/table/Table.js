import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template'
// import {$} from '@core/dom'
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }
    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        const {resize} = event.target.dataset
        if (!resize) {
            return
        }
        resizeHandler(this.$root, event)
    }
}
