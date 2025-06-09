import { Color } from "@/models/GlossCraft/Color"
import { MemoLaboError } from "@/utils/MemoLaboError"
import { HSL } from "./ColorModels"
import type { HexColor } from "./HexColor"
import { ColorUtils } from "./ColorUtils"

class ColorPalet {

    colors: HexColor[] = []

    constructor(colors: HexColor[]) {
        this.colors = colors
    }

    // Fonction generateComplementaryPalet
    static generateComplementaryPalet(color: Color, n: number): ColorPalet {
        // Vérification valeur entière
        if (!Number.isInteger(n)) {
            throw new MemoLaboError("N n'est pas un entier")
        }
        // Vérification 1 <= n <= 36
        if (!n.isBetween(1, 36)) {
            throw new MemoLaboError("N n'est pas entre 1 et 36")
        }
        // Tableau des couleurs de la future palette
        let colors: HexColor[] = []
        // Interval de la teinte
        const hueStep = 360 / n
        // Récupération du modèle HSL de base
        const srcHSL = color.get('hsl') as HSL
        // Construction de la palette
        for (let i=0; i<n; ++i) {
            // Génération d'un HSL
            const newHSL = new HSL(
                (srcHSL.hue + (i * hueStep)) % 360,
                srcHSL.saturation,
                srcHSL.lightness
            )
            // Conversion en RGB puis ajout de la nouvelle couleur
            colors.push(ColorUtils.rgbToHex(newHSL.toRGB()))
        }
        // Résultat
        return new ColorPalet(colors)
    }
    
}

export { ColorPalet }