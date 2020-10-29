export class TableSelection {
    static CLASSNAME = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clearGroup()
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelection.CLASSNAME).focus()
    }

    selectGroup($group = []) {
        this.clearGroup()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.CLASSNAME))
    }

    clearGroup() {
        this.group.forEach($el => $el.removeClass(TableSelection.CLASSNAME))
        this.group = []
    }
}
