class rgb {
    red: number
    green: number
    blue: number

    constructor(
        red: number,
        green: number,
        blue: number
    ) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    toHSL(): hsl {
        const red = this.red / 255
        const green = this.green / 255
        const blue = this.blue / 255

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
        return new hsl(
            hue * 360,
            sat * 100,
            lig * 100
        )
    }

    toHSV(): hsv {
        const red = this.red / 255
        const green = this.green / 255
        const blue = this.blue / 255

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
        return new hsv(
            hue * 360,
            sat * 100,
            val * 100
        )
    }

    toLab() {
        // Normaliser les valeurs RVB sur la plage [0, 1]
        const rNorm = this.red / 255;
        const gNorm = this.green / 255;
        const bNorm = this.blue / 255;
        
        // Appliquer la correction gamma (sRGB vers RVB linéaire)
        const rLinear = rNorm <= 0.04045 ? rNorm / 12.92 : Math.pow((rNorm + 0.055) / 1.055, 2.4);
        const gLinear = gNorm <= 0.04045 ? gNorm / 12.92 : Math.pow((gNorm + 0.055) / 1.055, 2.4);
        const bLinear = bNorm <= 0.04045 ? bNorm / 12.92 : Math.pow((bNorm + 0.055) / 1.055, 2.4);
        
        // Définir les valeurs XYZ de l'illuminant standard D65 (utilisées pour sRGB)
        const Xref = 0.95047;
        const Yref = 1.00000;
        const Zref = 1.08883;
        
        // Convertir RVB linéaire en XYZ
        const X = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
        const Y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.0721750;
        const Z = rLinear * 0.0193339 + gLinear * 0.1191920 + bLinear * 0.9503041;
        
        // Normaliser XYZ par le point blanc de référence
        const xNorm = X / Xref;
        const yNorm = Y / Yref;
        const zNorm = Z / Zref;
        
        // Définir une petite constante epsilon
        const epsilon = 0.008856;
        const kappa = 903.3;
        
        // Fonction pour calculer f(t)
        function f(t: number) {
            return t > epsilon ? Math.pow(t, 1 / 3) : (kappa * t + 16) / 116;
        }
        
        // Calculer L*, a* et b*
        return new lab(
            116 * f(yNorm) - 16,
            500 * (f(xNorm) - f(yNorm)),
            200 * (f(yNorm) - f(zNorm))
        )
    }

    // Alternative
    // toLab() : lab {
    //     let red = this.red / 255
    //     let green = this.green / 255
    //     let blue = this.blue / 255
    
    //     // RGB linéaire
    //     red = red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92
    //     green = green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92
    //     blue = blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92
    
    //     // Espace colorimétrique CIE XYZ
    //     const X = (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047;
    //     const Y = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 1.00000;
    //     const Z = (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883;
    
    //     // Fonction de transformation
    //     const transform = (t: number) => (t > 0.008856) ? Math.pow(t, 1 / 3) : (7.787 * t) + (16 / 116)
    //     const transX = transform(X)
    //     const transY = transform(Y)
    //     const transZ = transform(Z)
    
    //     // Conversion vers L*a*b*
    //     return new lab(
    //         (116 * transY) - 16,
    //         500 * (transX - transY),
    //         200 * (transY - transZ)
    //     )
    // }
    
    toString(): string {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`
    }
}

class hsl {
    hue: number
    saturation: number
    lightness: number

    constructor(
        hue: number,
        saturation: number,
        lightness: number
    ) {
        this.hue = hue
        this.saturation = saturation
        this.lightness = lightness
    }

    toString() {
        return `HSL(${this.hue}, ${this.saturation}, ${this.lightness})`
    }
}

class hsv {
    hue: number
    saturation: number
    value: number

    constructor(
        hue: number,
        saturation: number,
        value: number
    ) {
        this.hue = hue
        this.saturation = saturation
        this.value = value
    }

    toString() {
        return `HSV(${this.hue}, ${this.saturation}, ${this.value})`
    }
}

class lab {
    lightness: number
    a_: number
    b_: number

    constructor(
        lightness: number,
        a_: number,
        b_: number
    ) {
        this.lightness = lightness
        this.a_ = a_
        this.b_ = b_
    }

    toString() {
        return `L*a*b*(${this.lightness}, ${this.a_}, ${this.b_})`
    }
}

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

    public hexa: string = '#00000'
    
    public rgb: rgb

    public hsl: hsl

    public hsv: hsv

    public lab: lab

    // Constructeur
    public constructor(color: {
        hexa?: string
        rgb?: {
            red: number
            green: number
            blue: number
        }
    }) {
        let red = 0
        let green = 0
        let blue = 0

        // Si 
        if (color.hexa) {
            // Suppression du # en début et conversion en minuscule
            this.hexa = color.hexa.replace(/^#/, '').toLowerCase()
    
            // Conversion d'un code 3 à un code 6 caractère
            if (this.hexa.match(/^([0-9a-f]{3})$/i))
                this.hexa = this.hexa.split('').map(char => char + char).join('')

            // Rajout du # en début
            this.hexa = `#${this.hexa}`
            
            // Si le code couleur est invalide
            if (!this.hexa.match(/^#([0-9a-f]{6})$/i))
                throw new Error(`Code couleur invalide : <${this.hexa}>`)
    
            // Définition RGB
            red = parseInt(this.hexa.substring(1, 3), 16),
            green = parseInt(this.hexa.substring(3, 5), 16),
            blue = parseInt(this.hexa.substring(5, 7), 16)
        } else if (color.rgb) {
            red = color.rgb.red
            green = color.rgb.green
            blue = color.rgb.blue
        } else {
            throw new Error(`Configuration hexa ou rgb obligatoire`)
        }

        // Calcule des système colorimétriques
        this.rgb = new rgb(red, green, blue)
        this.hsl = this.rgb.toHSL()
        this.hsv = this.rgb.toHSV()
        this.lab = this.rgb.toLab()
    }
}
