import { BaseColorModel, ColorModelComponent } from "@/models/GlossCraft/ColorModels/Base"

type RGBType = {red: number, green: number, blue: number}

class RGB extends BaseColorModel {

    // Constructeur
    constructor(
        red: number = 0,
        green: number = 0,
        blue: number = 0
    ) {
        super('RGB', [
            new ColorModelComponent('red',   red,   { label: 'Rouge', code: 'R', min: 0, max: 255, step: 1 }),
            new ColorModelComponent('green', green, { label: 'Vert',  code: 'G', min: 0, max: 255, step: 1 }),
            new ColorModelComponent('blue',  blue,  { label: 'Bleu',  code: 'B', min: 0, max: 255, step: 1 }),
        ])
    }

    // Fonction fromRGB
    setFromRGB(rgb: RGBType) {
        this.red = rgb.red
        this.green = rgb.green
        this.blue = rgb.blue
    }

    // Fonction toRGB
    toRGB(): RGBType {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue
        }
    }

    // GETTERS
    get red():   number { return super.get('red') }
    get green(): number { return super.get('green') }
    get blue():  number { return super.get('blue') }

    // SETTERS
    set red(red: number)     { super.set('red', red) }
    set green(green: number) { super.set('green', green) }
    set blue(blue: number)   { super.set('blue', blue) }
    
}

export { type RGBType, RGB }
