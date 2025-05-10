import { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip } from "bootstrap"

const bsComponentMap: { [key: string]: {constructor: new (...args: any[]) => any, defaultOptions: object} } = {
    'alert': {
        constructor: Alert,
        defaultOptions: {}
    },
    'button': {
        constructor: Button,
        defaultOptions: {}
    },
    'carousel': {
        constructor: Carousel,
        defaultOptions: {}
    },
    'collapse': {
        constructor: Collapse,
        defaultOptions: {}
    },
    'dropdown': {
        constructor: Dropdown,
        defaultOptions: {}
    },
    'modal': {
        constructor: Modal,
        defaultOptions: {}
    },
    'offcanvas': {
        constructor: Offcanvas,
        defaultOptions: {}
    },
    'popover': {
        constructor: Popover,
        defaultOptions: {}
    },
    'scrollSpy': {
        constructor: ScrollSpy,
        defaultOptions: {}
    },
    'tab': {
        constructor: Tab,
        defaultOptions: {}
    },
    'toast': {
        constructor: Toast,
        defaultOptions: {}
    },
    'tooltip': {
        constructor: Tooltip,
        defaultOptions: {}
    }
}

export default {
    name: 'Bootstrap directive',

    mounted(element: HTMLElement, binding: any) {
        const Component = bsComponentMap[binding.arg?.toLowerCase()]
        if (!Component) {
            console.warn(`Bootstrap directive "${binding.arg}" not found. Available directives: ${Object.keys(bsComponentMap).join(', ')}`)
            return
        }
        return new Component.constructor(element, {...Component.defaultOptions, ...binding.value})
    }
}
