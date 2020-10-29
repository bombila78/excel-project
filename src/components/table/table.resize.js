import {$} from '@core/dom'

export function resizeHandler($root, event) {
    const {resize} = event.target.dataset
    const $resizer = $(event.target)

    const sideProp = resize === 'col' ? 'bottom' : 'right'
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const instanceNumber = $parent.getData(resize)

    const instances = Array
        .from(
            $root.findAll(`
                [data-${resize}='${instanceNumber}']
                `))
        .map($)

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })

    document.onmousemove = e => {
        if (resize === 'col') {
            const widthDelta = e.pageX - coords.right
            $resizer.css({right: -widthDelta + 'px'})
        } else {
            const heightDelta = e.pageY - coords.bottom
            $resizer.css({bottom: -heightDelta + 'px'})
        }
    }
    document.onmouseup = e => {
        if (resize === 'col') {
            const widthDelta = e.pageX - coords.right
            const newWidth = coords.width + widthDelta
            instances
                .forEach(el => el.css({width: newWidth + 'px'}))
        } else {
            const heightDelta = e.pageY - coords.bottom
            const newHeight = coords.height + heightDelta
            instances
                .forEach(el => el.css({height: newHeight + 'px'}))
        }

        $resizer.css({
            opacity: null,
            bottom: 0,
            right: 0
        })
        document.onmousemove = null
        document.onmouseup = null
    }
}
