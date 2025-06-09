import { Color } from "./Color"
import { CIELAB, HSL, RGB, type RGBType } from "./ColorModels"
import { HexColor } from "./HexColor"

type NamedColor = { name: string, hex: HexColor }
type ClosestColorType = { color: NamedColor, accurate: number }

abstract class ColorUtils {

    static standardHtmlColors: NamedColor[] = [
        { name: 'black', hex: new HexColor('#000000') },
        { name: 'silver', hex: new HexColor('#c0c0c0') },
        { name: 'gray', hex: new HexColor('#808080') },
        { name: 'white', hex: new HexColor('#ffffff') },
        { name: 'maroon', hex: new HexColor('#800000') },
        { name: 'red', hex: new HexColor('#ff0000') },
        { name: 'purple', hex: new HexColor('#800080') },
        { name: 'fuchsia', hex: new HexColor('#ff00ff') },
        { name: 'green', hex: new HexColor('#008000') },
        { name: 'lime', hex: new HexColor('#00ff00') },
        { name: 'olive', hex: new HexColor('#808000') },
        { name: 'yellow', hex: new HexColor('#ffff00') },
        { name: 'navy', hex: new HexColor('#000080') },
        { name: 'blue', hex: new HexColor('#0000ff') },
        { name: 'teal', hex: new HexColor('#008080') },
        { name: 'aqua', hex: new HexColor('#00ffff') },
    ]

    static allHtmlColors: NamedColor[] = [
        { name: 'aliceblue', hex: new HexColor('#f0f8ff') },
        { name: 'antiquewhite', hex: new HexColor('#faebd7') },
        { name: 'aqua', hex: new HexColor('#00ffff') },
        { name: 'aquamarine', hex: new HexColor('#7fffd4') },
        { name: 'azure', hex: new HexColor('#f0ffff') },
        { name: 'beige', hex: new HexColor('#f5f5dc') },
        { name: 'bisque', hex: new HexColor('#ffe4c4') },
        { name: 'black', hex: new HexColor('#000000') },
        { name: 'blanchedalmond', hex: new HexColor('#ffebcd') },
        { name: 'blue', hex: new HexColor('#0000ff') },
        { name: 'blueviolet', hex: new HexColor('#8a2be2') },
        { name: 'brown', hex: new HexColor('#a52a2a') },
        { name: 'burlywood', hex: new HexColor('#deb887') },
        { name: 'cadetblue', hex: new HexColor('#5f9ea0') },
        { name: 'chartreuse', hex: new HexColor('#7fff00') },
        { name: 'chocolate', hex: new HexColor('#d2691e') },
        { name: 'coral', hex: new HexColor('#ff7f50') },
        { name: 'cornflowerblue', hex: new HexColor('#6495ed') },
        { name: 'cornsilk', hex: new HexColor('#fff8dc') },
        { name: 'crimson', hex: new HexColor('#dc143c') },
        { name: 'cyan', hex: new HexColor('#00ffff') },
        { name: 'darkblue', hex: new HexColor('#00008b') },
        { name: 'darkcyan', hex: new HexColor('#008b8b') },
        { name: 'darkgoldenrod', hex: new HexColor('#b8860b') },
        { name: 'darkgray', hex: new HexColor('#a9a9a9') },
        { name: 'darkgreen', hex: new HexColor('#006400') },
        { name: 'darkgrey', hex: new HexColor('#a9a9a9') },
        { name: 'darkkhaki', hex: new HexColor('#bdb76b') },
        { name: 'darkmagenta', hex: new HexColor('#8b008b') },
        { name: 'darkolivegreen', hex: new HexColor('#556b2f') },
        { name: 'darkorange', hex: new HexColor('#ff8c00') },
        { name: 'darkorchid', hex: new HexColor('#9932cc') },
        { name: 'darkred', hex: new HexColor('#8b0000') },
        { name: 'darksalmon', hex: new HexColor('#e9967a') },
        { name: 'darkseagreen', hex: new HexColor('#8fbc8f') },
        { name: 'darkslateblue', hex: new HexColor('#483d8b') },
        { name: 'darkslategray', hex: new HexColor('#2f4f4f') },
        { name: 'darkslategrey', hex: new HexColor('#2f4f4f') },
        { name: 'darkturquoise', hex: new HexColor('#00ced1') },
        { name: 'darkviolet', hex: new HexColor('#9400d3') },
        { name: 'deeppink', hex: new HexColor('#ff1493') },
        { name: 'deepskyblue', hex: new HexColor('#00bfff') },
        { name: 'dimgray', hex: new HexColor('#696969') },
        { name: 'dimgrey', hex: new HexColor('#696969') },
        { name: 'dodgerblue', hex: new HexColor('#1e90ff') },
        { name: 'firebrick', hex: new HexColor('#b22222') },
        { name: 'floralwhite', hex: new HexColor('#fffaf0') },
        { name: 'forestgreen', hex: new HexColor('#228b22') },
        { name: 'fuchsia', hex: new HexColor('#ff00ff') },
        { name: 'gainsboro', hex: new HexColor('#dcdcdc') },
        { name: 'ghostwhite', hex: new HexColor('#f8f8ff') },
        { name: 'gold', hex: new HexColor('#ffd700') },
        { name: 'goldenrod', hex: new HexColor('#daa520') },
        { name: 'gray', hex: new HexColor('#808080') },
        { name: 'green', hex: new HexColor('#008000') },
        { name: 'greenyellow', hex: new HexColor('#adff2f') },
        { name: 'grey', hex: new HexColor('#808080') },
        { name: 'honeydew', hex: new HexColor('#f0fff0') },
        { name: 'hotpink', hex: new HexColor('#ff69b4') },
        { name: 'indianred', hex: new HexColor('#cd5c5c') },
        { name: 'indigo', hex: new HexColor('#4b0082') },
        { name: 'ivory', hex: new HexColor('#fffff0') },
        { name: 'khaki', hex: new HexColor('#f0e68c') },
        { name: 'lavender', hex: new HexColor('#e6e6fa') },
        { name: 'lavenderblush', hex: new HexColor('#fff0f5') },
        { name: 'lawngreen', hex: new HexColor('#7cfc00') },
        { name: 'lemonchiffon', hex: new HexColor('#fffacd') },
        { name: 'lightblue', hex: new HexColor('#add8e6') },
        { name: 'lightcoral', hex: new HexColor('#f08080') },
        { name: 'lightcyan', hex: new HexColor('#e0ffff') },
        { name: 'lightgoldenrodyellow', hex: new HexColor('#fafad2') },
        { name: 'lightgray', hex: new HexColor('#d3d3d3') },
        { name: 'lightgreen', hex: new HexColor('#90ee90') },
        { name: 'lightgrey', hex: new HexColor('#d3d3d3') },
        { name: 'lightpink', hex: new HexColor('#ffb6c1') },
        { name: 'lightsalmon', hex: new HexColor('#ffa07a') },
        { name: 'lightseagreen', hex: new HexColor('#20b2aa') },
        { name: 'lightskyblue', hex: new HexColor('#87cefa') },
        { name: 'lightslategray', hex: new HexColor('#778899') },
        { name: 'lightslategrey', hex: new HexColor('#778899') },
        { name: 'lightsteelblue', hex: new HexColor('#b0c4de') },
        { name: 'lightyellow', hex: new HexColor('#ffffe0') },
        { name: 'lime', hex: new HexColor('#00ff00') },
        { name: 'limegreen', hex: new HexColor('#32cd32') },
        { name: 'linen', hex: new HexColor('#faf0e6') },
        { name: 'magenta', hex: new HexColor('#ff00ff') },
        { name: 'maroon', hex: new HexColor('#800000') },
        { name: 'mediumaquamarine', hex: new HexColor('#66cdaa') },
        { name: 'mediumblue', hex: new HexColor('#0000cd') },
        { name: 'mediumorchid', hex: new HexColor('#ba55d3') },
        { name: 'mediumpurple', hex: new HexColor('#9370db') },
        { name: 'mediumseagreen', hex: new HexColor('#3cb371') },
        { name: 'mediumslateblue', hex: new HexColor('#7b68ee') },
        { name: 'mediumspringgreen', hex: new HexColor('#00fa9a') },
        { name: 'mediumturquoise', hex: new HexColor('#48d1cc') },
        { name: 'mediumvioletred', hex: new HexColor('#c71585') },
        { name: 'midnightblue', hex: new HexColor('#191970') },
        { name: 'mintcream', hex: new HexColor('#f5fffa') },
        { name: 'mistyrose', hex: new HexColor('#ffe4e1') },
        { name: 'moccasin', hex: new HexColor('#ffe4b5') },
        { name: 'navajowhite', hex: new HexColor('#ffdead') },
        { name: 'navy', hex: new HexColor('#000080') },
        { name: 'oldlace', hex: new HexColor('#fdf5e6') },
        { name: 'olive', hex: new HexColor('#808000') },
        { name: 'olivedrab', hex: new HexColor('#6b8e23') },
        { name: 'orange', hex: new HexColor('#ffa500') },
        { name: 'orangered', hex: new HexColor('#ff4500') },
        { name: 'orchid', hex: new HexColor('#da70d6') },
        { name: 'palegoldenrod', hex: new HexColor('#eee8aa') },
        { name: 'palegreen', hex: new HexColor('#98fb98') },
        { name: 'paleturquoise', hex: new HexColor('#afeeee') },
        { name: 'palevioletred', hex: new HexColor('#db7093') },
        { name: 'papayawhip', hex: new HexColor('#ffefd5') },
        { name: 'peachpuff', hex: new HexColor('#ffdab9') },
        { name: 'peru', hex: new HexColor('#cd853f') },
        { name: 'pink', hex: new HexColor('#ffc0cb') },
        { name: 'plum', hex: new HexColor('#dda0dd') },
        { name: 'powderblue', hex: new HexColor('#b0e0e6') },
        { name: 'purple', hex: new HexColor('#800080') },
        { name: 'rebeccapurple', hex: new HexColor('#663399') },
        { name: 'red', hex: new HexColor('#ff0000') },
        { name: 'rosybrown', hex: new HexColor('#bc8f8f') },
        { name: 'royalblue', hex: new HexColor('#4169e1') },
        { name: 'saddlebrown', hex: new HexColor('#8b4513') },
        { name: 'salmon', hex: new HexColor('#fa8072') },
        { name: 'sandybrown', hex: new HexColor('#f4a460') },
        { name: 'seagreen', hex: new HexColor('#2e8b57') },
        { name: 'seashell', hex: new HexColor('#fff5ee') },
        { name: 'sienna', hex: new HexColor('#a0522d') },
        { name: 'silver', hex: new HexColor('#c0c0c0') },
        { name: 'skyblue', hex: new HexColor('#87ceeb') },
        { name: 'slateblue', hex: new HexColor('#6a5acd') },
        { name: 'slategray', hex: new HexColor('#708090') },
        { name: 'slategrey', hex: new HexColor('#708090') },
        { name: 'snow', hex: new HexColor('#fffafa') },
        { name: 'springgreen', hex: new HexColor('#00ff7f') },
        { name: 'steelblue', hex: new HexColor('#4682b4') },
        { name: 'tan', hex: new HexColor('#d2b48c') },
        { name: 'teal', hex: new HexColor('#008080') },
        { name: 'thistle', hex: new HexColor('#d8bfd8') },
        { name: 'tomato', hex: new HexColor('#ff6347') },
        { name: 'turquoise', hex: new HexColor('#40e0d0') },
        { name: 'violet', hex: new HexColor('#ee82ee') },
        { name: 'wheat', hex: new HexColor('#f5deb3') },
        { name: 'white', hex: new HexColor('#ffffff') },
        { name: 'whitesmoke', hex: new HexColor('#f5f5f5') },
        { name: 'yellow', hex: new HexColor('#ffff00') },
        { name: 'yellowgreen', hex: new HexColor('#9acd32') },
    ]

    
    // Fonction random
    static random(): Color {
        return new Color({
            red: Math.round(Math.random() * 255),
            green: Math.round(Math.random() * 255),
            blue: Math.round(Math.random() * 255)
        })
    }

    // Fonction inverse
    static inverse(color: Color): Color {
        // Récupération du modèle RGB
        const rgb = color.get('rgb') as RGB
        // Inversion des composantes RGB
        return new Color({
            red: 255 - rgb.red,
            green: 255 - rgb.green,
            blue: 255 - rgb.blue
        })
    }

    // Fonction complementary
    static complementary(color: Color): Color {
        // Récupération du modèle HSL
        const srcHSL = (color.get('hsl') as HSL)
        // Création du nouverau modèle HSL avec une variatiuon de 180° à la teinte originale
        const destHSL = new HSL(
            (srcHSL.hue + 180) % 360,
            srcHSL.saturation,
            srcHSL.lightness)
        // Conversion en RGB
        const rgb = destHSL.toRGB()
        return new Color({
            red: rgb.red,
            green: rgb.green,
            blue: rgb.blue
        })
    }

    // Fonction closest
    static closest(color: Color, list: NamedColor[] = ColorUtils.allHtmlColors): ClosestColorType {
        // Fonction de calcule de ressemblance
        const calculateAccurate = (rgb1: RGBType, rgb2: RGBType): number => {
            const rDiff = rgb1.red - rgb2.red
            const gDiff = rgb1.green - rgb2.green
            const bDiff = rgb1.blue - rgb2.blue
            return 1 - Math.sqrt((rDiff * rDiff + gDiff * gDiff + bDiff * bDiff) / (255 * 255 * 3))
        }
        // rgb
        const rgb = color.get('rgb').getModel() as RGBType
        // variables de la couleurs la plus ressemblante
        let closestColorName = ''
        let closestColorHex = new HexColor()
        let closestColorAccurate = 0
        // Listes des couleurs à tester
        // Boucle de test
        list.forEach(namedColor => {
            const colorRGB = ColorUtils.hexToRGB(namedColor.hex)
            const accurate = calculateAccurate(rgb, colorRGB)
            if (accurate > closestColorAccurate) {
                closestColorName = namedColor.name
                closestColorHex = namedColor.hex
                closestColorAccurate = accurate
            }
        })
        // résultat
        return {
            color: {
                name: closestColorName,
                hex: closestColorHex
            },
            accurate: closestColorAccurate,
        }
    }

    // Fonction betterContrast
    static betterContrast(color: Color | HexColor): HexColor {
        // Si la couleru est au format string
        if (color instanceof HexColor) {
            const cielab = new CIELAB
            // Conversion en cielab pour utiliser la composante lightness
            cielab.setFromRGB(ColorUtils.hexToRGB(color))
            // blanc si luminosité inférieur à 50, sinon noir
            return cielab.lightness < 50 ? new HexColor('#FFFFFF') : new HexColor('#000000')
        }
        return (color.get('cielab') as CIELAB).lightness < 50 ? new HexColor('#FFFFFF') : new HexColor('#000000')
    }

    // Fonction rgbToHex
    static rgbToHex(rgb: RGBType): HexColor {
        // Bornes
        const minValue = 0
        const maxValue = 255

        // Vérification des valeurs
        rgb.red = Math.min(maxValue, Math.max(minValue, rgb.red))
        rgb.green = Math.min(maxValue, Math.max(minValue, rgb.green))
        rgb.blue = Math.min(maxValue, Math.max(minValue, rgb.blue))

        // Code hexadécimal
        let hexaR = Math.round(rgb.red).toString(16).padStart(2, '0')
        let hexaG = Math.round(rgb.green).toString(16).padStart(2, '0')
        let hexaB = Math.round(rgb.blue).toString(16).padStart(2, '0')

        // RGB en hexadécimal
        return new HexColor(`#${hexaR}${hexaG}${hexaB}`)
        
    }

    // Fonction hexToRGB
    static hexToRGB(hex: HexColor): RGBType {
        return {
            red: parseInt(hex.value.substring(1, 3), 16),
            green: parseInt(hex.value.substring(3, 5), 16),
            blue: parseInt(hex.value.substring(5, 7), 16)
        }
    }


}

export { ColorUtils, type NamedColor, type ClosestColorType }