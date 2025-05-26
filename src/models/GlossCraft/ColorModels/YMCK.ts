import { BaseColorModel, ColorModelComponent } from "@/models/GlossCraft/ColorModels/BaseColorModel";
import type { RGBType } from "@/models/GlossCraft/ColorModels/RGB"

type YMCKType =  {yellow: number, magenta: number, cyan: number, black: number}

class YMCK extends BaseColorModel {

    // Constructeur
    constructor(
        yellow: number = 0,
        magenta: number = 0,
        cyan: number = 0,
        black: number = 0,
    ) {
        super('YMCK', [
            new ColorModelComponent('yellow',  yellow,  { label: 'Jaune',   code: 'Y', min: 0, max: 100, step: 1 }),
            new ColorModelComponent('magenta', magenta, { label: 'Magenta', code: 'M', min: 0, max: 100, step: 1 }),
            new ColorModelComponent('cyan',    cyan,    { label: 'Cyan',    code: 'C', min: 0, max: 100, step: 1 }),
            new ColorModelComponent('black',   black,   { label: 'Noir',    code: 'K', min: 0, max: 100, step: 1 }),
        ])
    }

    // Fonction fromRGB
    setFromRGB(rgb: RGBType) {
        // Normalize RGB values to the range [0, 1]
        const rNorm = rgb.red / 255;
        const gNorm = rgb.green / 255;
        const bNorm = rgb.blue / 255;

        // Calculate Black (K)
        const k = 1 - Math.max(rNorm, gNorm, bNorm);

        // Calculate Cyan (C), Magenta (M), and Yellow (Y)
        let c = (1 - rNorm - k) / (1 - k);
        let m = (1 - gNorm - k) / (1 - k);
        let y = (1 - bNorm - k) / (1 - k);

        // Handle the case where K = 1 to avoid division by zero
        if (k === 1) {
            c = 0;
            m = 0;
            y = 0;
        }

        // Set the YMCK values
        this.yellow = y * 100
        this.magenta = m * 100
        this.cyan = c * 100
        this.black = k * 100
    }

    // Fonction toRGB
    toRGB(): RGBType {
        // Ensure YMCK values are within the valid range [0, 1]
        const normY = this.yellow/100;
        const normM = this.magenta/100;
        const normC = this.cyan/100;
        const normK = this.black/100;

        // Calculate RGB values
        return {
            red: (1 - normY) * (1 - normK) * 255,
            green: (1 - normM) * (1 - normK) * 255,
            blue: (1 - normC) * (1 - normK) * 255
        }
    }

    // GETTERS
    get yellow(): number  { return super.get('yellow') }
    get magenta(): number { return super.get('magenta') }
    get cyan(): number    { return super.get('cyan') }
    get black(): number   { return super.get('black') }

    // SETTERS
    set yellow(yellow: number)   { super.set('yellow', yellow) }
    set magenta(magenta: number) { super.set('magenta', magenta) }
    set cyan(cyan: number)       { super.set('cyan', cyan) }
    set black(black: number)     { super.set('black', black) }
    
}

export { type YMCKType, YMCK }
