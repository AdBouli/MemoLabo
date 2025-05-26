import { MemoLaboError } from "@/utils/MemoLaboError"
import {
    type ColorModelType, type IColorModel, BaseColorModel, ColorModelComponent,
    type RGBType, RGB,
    type CIELABType, CIELAB,
    type HSLType, HSL,
    type HSVType, HSV,
    type YMCKType, YMCK,
} from "@/models/GlossCraft/ColorModels"

type ColorModelConstructorsType = Array<new (...args: number[]) => BaseColorModel>

export class Color {

    public static named = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        //transparent: 'transparent',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    }

    public hex: string
    private models: Map<string, BaseColorModel>

    private static colorModelConstructors: ColorModelConstructorsType = [ RGB, HSL, CIELAB, YMCK, HSV ]

    // Constructeur
    private constructor(
        hex: string,
        rgb: RGBType
    ) {
        this.hex = hex
        this.models = new Map<string, BaseColorModel>()
        Color.colorModelConstructors.forEach(Constructor => {
            const constructorName = Constructor.name.toLowerCase()
            this.models.set(constructorName, new Constructor())
            this.models.get(constructorName)?.setFromRGB(rgb)
        })
    }

    // Fonction createFromHex
    static createFromHex(hex: string): Color {
        // Conversion en minuscule
        hex = hex.toLowerCase()

        // Conversion d'un code 3 à un code 6 caractères
        if (hex.match(/^([#])?([0-9a-f]{3})$/i))
            hex = hex.split('').map(char => char + char).join('')

        // Rajout du # en début s'il est absent
        hex = hex.charAt(0) === '#' ? hex : `#${hex}`
        
        // Si le code couleur est valide
        if (hex.match(/^#([0-9a-f]{6})$/i)) {
            // Création de la couleur
            return new Color(
                hex, {
                    red: parseInt(hex.substring(1, 3), 16),
                    green: parseInt(hex.substring(3, 5), 16),
                    blue: parseInt(hex.substring(5, 7), 16)
                }
            )
        } else {
            // Sinon erreur
            throw new MemoLaboError(`Code hexadécimal invalide : ${hex}.`)
        }
    }

    // Fonction createFromRGB
    static createFromRGB(rgb: RGBType): Color {
        // Bornes
        const minValue = 0
        const maxValue = 255

        // Vérification des valeurs
        if (!rgb.red.isBetween(minValue, maxValue))
            throw new MemoLaboError(`Valeur du rouge invalide : ${rgb.red}.`)
        if (!rgb.green.isBetween(minValue, maxValue))
            throw new MemoLaboError(`Valeur du vert invalide : ${rgb.green}.`)
        if (!rgb.blue.isBetween(minValue, maxValue))
            throw new MemoLaboError(`Valeur du bleu invalide : ${rgb.blue}.`)

        // Code hexadécimal
        let hexaR = rgb.red.toString(16).padStart(2, '0')
        let hexaG = rgb.green.toString(16).padStart(2, '0')
        let hexaB = rgb.blue.toString(16).padStart(2, '0')

        // Création de la couleur
        return new Color(
            `#${hexaR}${hexaG}${hexaB}`,
            rgb
        )
    }

    // Getter
    public get(name: string): BaseColorModel {
        const colorModel = this.models.get(name.toLowerCase())
        if (colorModel === undefined) {
            throw new MemoLaboError(`Le modèle de couleur ${name} n'existe pas.`)
        }
        return colorModel
    }

    // Setter
    public set(name: string, colorModel: BaseColorModel): void {
        const colorModelName = name.toLowerCase()
        if (this.models.has(name)) {
            this.models.set(name, colorModel)
            Color.colorModelConstructors.forEach(Constructor => {
                const constructorName = Constructor.name.toLowerCase()
                if (constructorName !== colorModelName) {
                    this.models.get(constructorName)?.setFromRGB(this.rgb.getModel() as RGBType)
                }
            })
        } else {
            throw new MemoLaboError(`Le modèle de couleur ${name} n'existe pas.`)
        }
    }

    // GETTERS
    get rgb(): IColorModel    { return this.get('rgb') }
    get cielab(): IColorModel { return this.get('cielab') }
    get hsl(): IColorModel    { return this.get('hsl') }
    get hsv(): IColorModel    { return this.get('hsv') }
    get ymck(): IColorModel   { return this.get('ymck') }

    // SETTERS
    set rgb(rgb: RGB)          { this.set('rgb', rgb) }
    set cielab(cielab: CIELAB) { this.set('cielab', cielab) }
    set hsl(hsl: HSL)          { this.set('hsl', hsl) }
    set hsv(hsv: HSV)          { this.set('hsv', hsv) }
    set ymck(ymck: YMCK)       { this.set('ymck', ymck) }

}
