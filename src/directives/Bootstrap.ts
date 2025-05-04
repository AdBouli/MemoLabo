import { Tooltip, Popover } from "bootstrap"

const constructorMap: { [key: string]: new (...args: any[]) => any } = {
    'tooltip': Tooltip,
    'popover': Popover,
}

export default {

    name: 'Bootstrap directive',

    mounted(element: HTMLElement, binding: any) {
        const Constructor = constructorMap[binding.arg?.toLowerCase()];
        if (!Constructor) {
            console.warn(`Bootstrap directive "${binding.arg}" not found. Available directives: ${Object.keys(constructorMap).join(', ')}`);
            return;
        }
        return new Constructor(element, binding.value);
    }

}
