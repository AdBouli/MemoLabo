class HexColor {

    private static DEFAULT_VALUE = '#000000'
    
    static hexValidator: RegExp = /^#?([0-9a-f]{6})$/i

    private _value: string = HexColor.DEFAULT_VALUE

    // Constructeur
    constructor(hex: string = HexColor.DEFAULT_VALUE) {
        this.value = hex
    }

    // Fonction isValidHex
    static isValidHex(hex: string): boolean {
        return HexColor.hexValidator.test(hex)
    }

    // Fonction hexFormat
    static hexFormat(hex: string): string {
        // Suppression des espaces et conversion en minuscule
        hex = hex.trim().toLowerCase()
        // Rajout du # en début s'il est absent
        hex = hex.charAt(0) === '#' ? hex : `#${hex}`
        // Résultat
        return hex
    }

    // Getter
    public get value(): string {
        return this._value
    }
    
    // Setter
    public set value(hex: string) {
        // Conversion
        hex = HexColor.hexFormat(hex)
        // Vérification
        if (HexColor.isValidHex(hex)) {
            this._value = hex
        }
    }

    // toString
    public toString(): string {
        return this._value
    }

}

export { HexColor }
