import { BaseColorModel, ColorModelComponent } from "@/models/GlossCraft/ColorModels/Base"
import type { RGBType } from "@/models/GlossCraft/ColorModels/RGB"

type CIELABType = {lightness: number, a_star: number, b_star: number}

class CIELAB extends BaseColorModel {

    // Constructeur
    constructor(
        lightness: number = 0,
        a_star: number = 0,
        b_star: number = 0
    ) {
        super('CIELAB', [
            new ColorModelComponent('lightness', lightness, { label: 'L*', code: 'L', min: 0,    max: 100, step: 1 }),
            new ColorModelComponent('a_star',    a_star,    { label: 'a*', code: 'a', min: -128, max: 128, step: 1 }),
            new ColorModelComponent('b_star',    b_star,    { label: 'b*', code: 'b', min: -128, max: 128, step: 1 }),
        ])
    }

    // Fonction fromRGB
    setFromRGB(rgb: RGBType) {
        // Normaliser les valeurs RVB sur la plage [0, 1]
        const rNorm = rgb.red / 255
        const gNorm = rgb.green / 255
        const bNorm = rgb.blue / 255
        
        // Appliquer la correction gamma (sRGB vers RVB linéaire)
        const rLinear = rNorm <= 0.04045 ? rNorm / 12.92 : Math.pow((rNorm + 0.055) / 1.055, 2.4)
        const gLinear = gNorm <= 0.04045 ? gNorm / 12.92 : Math.pow((gNorm + 0.055) / 1.055, 2.4)
        const bLinear = bNorm <= 0.04045 ? bNorm / 12.92 : Math.pow((bNorm + 0.055) / 1.055, 2.4)
        
        // Définir les valeurs XYZ de l'illuminant standard D65 (utilisées pour sRGB)
        const Xref = 0.95047
        const Yref = 1.00000
        const Zref = 1.08883
        
        // Convertir RVB linéaire en XYZ
        const X = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375
        const Y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.0721750
        const Z = rLinear * 0.0193339 + gLinear * 0.1191920 + bLinear * 0.9503041
        
        // Normaliser XYZ par le point blanc de référence
        const xNorm = X / Xref
        const yNorm = Y / Yref
        const zNorm = Z / Zref
        
        // Définir une petite constante epsilon
        const epsilon = 0.008856
        const kappa = 903.3
        
        // Fonction pour calculer f(t)
        function f(t: number) {
            return t > epsilon ? Math.pow(t, 1 / 3) : (kappa * t + 16) / 116
        }
        
        // Calculer L*, a* et b*
        this.lightness = 116 * f(yNorm) - 16
        this.a_star = 500 * (f(xNorm) - f(yNorm))
        this.b_star = 200 * (f(yNorm) - f(zNorm))
    }

    // Fonction toRGB
    toRGB(): RGBType {
        const y = (this.lightness + 16) / 116
        const x = (this.a_star / 500) + y
        const z = y - (this.b_star / 200)

        const delta = 6 / 29

        const fx = x > delta ? Math.pow(x, 3) : (x - 4 / 29) * (108 / 841)
        const fy = y > delta ? Math.pow(y, 3) : (y - 4 / 29) * (108 / 841)
        const fz = z > delta ? Math.pow(z, 3) : (z - 4 / 29) * (108 / 841)

        const Xref = 0.95047
        const Yref = 1.00000
        const Zref = 1.08883

        const X = fx * Xref
        const Y = fy * Yref
        const Z = fz * Zref

        let r = X * 3.2404542 + Y * -1.5371385 + Z * -0.4985314
        let g = X * -0.9692660 + Y * 1.8760108 + Z * 0.0415560
        let b_val = X * 0.0556434 + Y * -0.2040259 + Z * 1.0572252

        // Correction gamma (RGB linéraire vers sRGB)
        r = r <= 0.0031308 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055
        g = g <= 0.0031308 ? 12.92 * g : 1.055 * Math.pow(g, 1 / 2.4) - 0.055
        b_val = b_val <= 0.0031308 ? 12.92 * b_val : 1.055 * Math.pow(b_val, 1 / 2.4) - 0.055

        // Conversion vers RGB
        return  {
            red: r * 255,
            green: g * 255,
            blue: b_val * 255
        }
    }

    // GETTERS
    get lightness(): number { return super.get('lightness') }
    get a_star(): number    { return super.get('a_star') }
    get b_star(): number    { return super.get('b_star') }

    // SETTERS
    set lightness(lightness: number) { super.set('lightness', lightness) }
    set a_star(a_star: number)       { super.set('a_star', a_star) }
    set b_star(b_star: number)       { super.set('b_star', b_star) }
    
}

export { type CIELABType, CIELAB }
