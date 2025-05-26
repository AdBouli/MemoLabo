import { BaseColorModel, ColorModelComponent } from "@/models/GlossCraft/ColorModels/BaseColorModel"
import type { RGBType } from "@/models/GlossCraft/ColorModels/RGB"

type HSLType = {hue: number, saturation: number, lightness: number}

class HSL extends BaseColorModel {

    // Constructeur
    constructor(
        hue: number = 0,
        saturation: number = 0,
        lightness: number = 0
    ) {
        super('HSL', [
            new ColorModelComponent('hue',        hue,        { label: 'Teinte',     code: 'H', min: 0, max: 360, step: 1 }),
            new ColorModelComponent('saturation', saturation, { label: 'Saturation', code: 'S', min: 0, max: 100, step: 1 }),
            new ColorModelComponent('lightness',  lightness,  { label: 'Luminosité', code: 'L', min: 0, max: 100, step: 1 }),
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

        // Calcul de la luminosité
        let lig = (maxRGB + minRGB) / 2

        if (maxRGB !== minRGB) {
            const delta = maxRGB - minRGB
            // Calcule de la saturation
            sat = lig > 0.5 ? delta / (2 - maxRGB - minRGB) : delta / (maxRGB + minRGB)
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

        // Conversion vers HSL
        this.hue = hue * 360,
        this.saturation = sat * 100,
        this.lightness = lig * 100
    }

    // Fonction toRGB
    toRGB(): RGBType {
        // Normaliser les valeurs HSL sur la plage [0, 1]
        const hue = this.hue / 360
        const sat = this.saturation / 100
        const lig = this.lightness / 100

        // Initialiser les valeurs RVB
        let red = 0
        let green = 0
        let blue = 0

        if (sat !== 0) {
            const hueToRGB = (p: number, q: number, t: number) => {
                if (t < 0) t += 1
                if (t > 1) t -= 1
                if (t < 1 / 6) return p + (q - p) * 6 * t
                if (t < 1 / 2) return q
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
                return p
            };

            const q = lig < 0.5 ? lig * (1 + sat) : lig + sat - lig * sat
            const p = 2 * lig - q
            red = hueToRGB(p, q, hue + 1 / 3)
            green = hueToRGB(p, q, hue)
            blue = hueToRGB(p, q, hue - 1 / 3)
        }

        // Conversion vers RVB
        return {
            red: red * 255,
            green: green * 255,
            blue: blue * 255
        }
    }

    // GETTERS
    get hue(): number        { return super.get('hue') }
    get saturation(): number { return super.get('saturation') }
    get lightness(): number  { return super.get('lightness') }

    // SETTERS
    set hue(hue: number)               { super.set('hue', hue) }
    set saturation(saturation: number) { super.set('saturation', saturation) }
    set lightness(lightness: number)   { super.set('lightness', lightness) }
    
}

export { type HSLType, HSL }