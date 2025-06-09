import { MemoLaboError } from "@/utils/MemoLaboError"
import {
    type ColorModelType, type IColorModel, BaseColorModel, ColorModelComponent,
    type RGBType, RGB,
    type CIELABType, CIELAB,
    type HSLType, HSL,
    type HSVType, HSV,
    type CMYKType, CMYK,
} from "@/models/GlossCraft/ColorModels"
import { ColorUtils } from "./ColorUtils"
import { HexColor } from "./HexColor"

type ColorModelConstructorsType = Array<new (...args: number[]) => BaseColorModel>
class Color {

    public hex: HexColor
    private _models: Map<string, IColorModel>

    private static colorModelConstructors: ColorModelConstructorsType = [ RGB, HSL, CIELAB, CMYK, HSV ]

    // Constructeur
    constructor(config: HexColor | RGBType) {
        let hex: HexColor = new HexColor('#000000')
        let rgb: RGBType = { red: 0, green: 0, blue: 0 }
        if (config instanceof HexColor) {
            rgb = ColorUtils.hexToRGB(config)
            hex = config
        } else {
            hex = ColorUtils.rgbToHex(config)
            rgb = config
        }
        this._models = new Map<string, BaseColorModel>()
        this.hex = hex
        Color.colorModelConstructors.forEach(Constructor => {
            const constructorName = Constructor.name.toLowerCase()
            this._models.set(constructorName, new Constructor())
            this._models.get(constructorName)?.setFromRGB(rgb)
        })
    }

    // Getter générique
    public get(name: string): IColorModel {
        // Récupération du modèle
        const colorModel = this._models.get(name.toLowerCase())
        // S'il n'existe pas : erreur
        if (colorModel === undefined) {
            throw new MemoLaboError(`Le modèle de couleur ${name} n'existe pas.`)
        }
        // Résultat
        return colorModel
    }

    // Setter générique
    public set(name: string, colorModel: IColorModel): void {
        // Nom du modèle en minuscule
        const colorModelName = name.toLowerCase()
        // Si le modèle existe dans le dictionnaire
        if (this._models.has(name)) {
            // Mise à jour du modèle
            this._models.set(name, colorModel)
            // Conversion en RGB pour mettre à jour les autres modèles
            const rgb = colorModel.toRGB()
            // Parcours de tous les constructeurs
            Color.colorModelConstructors.forEach(Constructor => {
                // Récupération du nom du modèle correspondant en minuscule
                const constructorName = Constructor.name.toLowerCase()
                // Si ce n'est pas le modèle mise à jour précedemment
                if (constructorName !== colorModelName) {
                    // Mise à jour du modèle avec le RGB calculé depuis le modèle de référence
                    this._models.get(constructorName)?.setFromRGB(rgb)
                }
            })
        } else {
            // Si le modèle n'existe pas : erreur
            throw new MemoLaboError(`Le modèle de couleur ${name} n'existe pas.`)
        }
    }

    // Get models
    public get models(): MapIterator<IColorModel> {
        return this._models.values()
    }

}

export { Color }
