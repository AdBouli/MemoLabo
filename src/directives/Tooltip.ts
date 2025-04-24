import { Tooltip } from "bootstrap"

export default {
    mounted(el: HTMLElement, binding: any) {
        new Tooltip(el, {
            title: binding.value,
            placement: binding.arg ?? 'top',
        })
    }
}
