import {Page} from '@core/Page';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/store/rootReducer';
import {normalizeInitialState} from '@/store/initialState';
import {debounce, storage} from '@core/utils';
import {Header} from '@/components/header/Header';
import {Excel} from '@/components/excel/Excel';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

function storageName(param) {
  return `excel:${param}`
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString()

    const tableState = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(tableState))
    const stateListener = debounce(state => {
        storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel( {
        components: [Header, Toolbar, Formula, Table],
        store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
