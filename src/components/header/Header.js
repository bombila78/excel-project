import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/store/actions';
import {defaultTitle} from '@/constants';
import {$} from '@core/dom';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return `
            <input
                    class="input"
                    type="text"
                    value="${title}"
            >

            <div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">
                        exit_to_app
                    </span>
                </div>
                <div class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">
                        delete
                    </span>
                </div>
            </div>
        `
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }

    onClick(event) {
        console.log(event)
        const $target = $(event.target)
        if ($target.getData('button') === 'remove') {
            const decision = confirm('Do you want to delete this table?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('#')
            }
        } else if ($target.getData('button') === 'exit') {
            ActiveRoute.navigate('#')
        }
    }
}
