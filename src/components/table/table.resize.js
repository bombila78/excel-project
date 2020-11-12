import {$} from '@core/dom'

export function resizeHandler($root, event) {
    return new Promise(resolve => {
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

        let value

        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })

        document.onmousemove = e => {
            if (resize === 'col') {
                const widthDelta = e.pageX - coords.right
                value = coords.width + widthDelta
                $resizer.css({right: -widthDelta + 'px'})
            } else {
                const heightDelta = e.pageY - coords.bottom
                value = coords.height + heightDelta
                $resizer.css({bottom: -heightDelta + 'px'})
            }
        }
        document.onmouseup = e => {
            document.onmousemove = null
            document.onmouseup = null
            if (resize === 'col') {
                instances
                    .forEach(el => el.css({width: value + 'px'}))
            } else {
                instances
                    .forEach(el => el.css({height: value + 'px'}))
            }

            resolve({
                value,
                type: resize,
                id: $parent.getData(resize)
            })

            $resizer.css({
                opacity: null,
                bottom: 0,
                right: 0
            })
        }
    })
}
