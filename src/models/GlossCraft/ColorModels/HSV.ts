import { BaseColorModel, ColorModelComponent } from "@/models/GlossCraft/ColorModels/BaseColorModel"
import type { RGBType } from "@/models/GlossCraft/ColorModels/RGB"

type HSVType = {hue: number, saturation: number, value: number}

class HSV extends BaseColorModel {

    // Constructeur
    constructor(
        hue: number = 0,
        saturation: number = 0,
        value: number = 0
    ) {
        super('HSV', [
            new ColorModelComponent('hue',        hue,        { label: 'Teinte',     code: 'H', min: 0, max: 360, step: 1 }),
            new ColorModelComponent('saturation', saturation, { label: 'Saturation', code: 'S', min: 0, max: 100, step: 1 }),
            new ColorModelComponent('value',      value,      { label: 'Valeur',     code: 'V', min: 0, max: 100, step: 1 }),
        ])
    }

    // Fonction fromRGB
    setFromRGB(rgb: RGBType) {
        // Normaliser les valeurs RVB sur la plage [0, 1]
        const red = rgb.red / 255
        const green = rgb.green / 255
        const blue = rgb.blue / 255

        // Trouver la valeur maximale et minimale parmi les trois couleurs
        const maxRGB = Math.max(red, green, blue)
        const minRGB = Math.min(red, green, blue)

        // Chromatique (si maxRGB === minRGB)
        let hue = 0
        let sat = 0
        // Calcul de la valeur
        let val = maxRGB

        if (maxRGB !== minRGB) {
            const delta = maxRGB - minRGB
            // Calcule de la saturation
            sat = maxRGB == 0 ? 0 : delta / maxRGB
            // Calcule de la teinte (hue)
            switch (maxRGB) {
                case red:
                    hue = (green - blue) / delta + (green < blue ? 6 : 0)
                    break
                case green:
                    hue = (blue - red) / delta + 2
                    break
                case blue:
                    hue = (red - green) / delta + 4
                    break
            }
            hue /= 6
        }

        // Conversion vers HSV
        this.hue = hue * 360
        this.saturation = sat * 100
        this.value = val * 100
    }

    // Fonction toRGB
    toRGB(): RGBType {
        const hue = this.hue / 360
        const sat = this.saturation / 100
        const val = this.value / 100

        let red = 0
        let green = 0
        let blue = 0

        const i = Math.floor(hue * 6)
        const f = hue * 6 - i
        const p = val * (1 - sat)
        const q = val * (1 - f * sat)
        const t = val * (1 - (1 - f) * sat)

        switch (i % 6) {
            case 0:
                red = val
                green = t
                blue = p
                break
            case 1:
                red = q
                green = val
                blue = p
                break
            case 2:
                red = p
                green = val
                blue = t
                break
            case 3:
                red = p
                green = q
                blue = val
                break
            case 4:
                red = t
                green = p
                blue = val
                break
            case 5:
                red = val
                green = p
                blue = q
                break
        }

        return {
            red: red * 255,
            green: green * 255,
            blue: blue * 255
        }
    }

    // GETTERS
    get hue(): number        { return super.get('hue') }
    get saturation(): number { return super.get('saturation') }
    get value(): number      { return super.get('value') }

    // SETTERS
    set hue(hue: number)               { super.set('hue', hue) }
    set saturation(saturation: number) { super.set('saturation', saturation) }
    set value(value: number)           { super.set('value', value) }
    
}

export { type HSVType, HSV }
