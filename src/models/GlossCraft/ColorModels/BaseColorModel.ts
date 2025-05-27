import { MemoLaboError } from '@/utils/MemoLaboError'
import type { RGBType } from "@/models/GlossCraft/ColorModels/RGB"

type ColorModelType = { [key: string]: number }

interface IColorModel {
    setFromRGB (rgb: RGBType): void
    toRGB (): RGBType
    getName(): string
    getComponentNames(): string[]
    getModel(): ColorModelType
    getComponents(): Array<ColorModelComponent>
    getComponent(name: string): ColorModelComponent
    toString(): string
}

abstract class BaseColorModel implements IColorModel {

    // Propriétés
    private name: string
    private components: Array<ColorModelComponent>

    // Constructeur
    constructor(
        name: string,
        components: Array<ColorModelComponent>
    ) {
        this.name = name
        this.components = components
    }

    // Fonctions à définir
    public abstract setFromRGB (rgb: RGBType): void
    public abstract toRGB (): RGBType

    // Getter de la valeur d'un composant
    protected get(name: string): number {
        let value: number|undefined = undefined
        this.components.forEach(component => {
            if (component.name === name) {
                value = component.value
            }
        })
        if (value === undefined)
            throw new MemoLaboError(`La composante ${name} n'existe pas dans le système de couleur ${this.constructor.name}.`)
        return value
    }

    // Setter de la valeur d'un composant
    protected set(name: string, value: number) {
        let unreached = true
        this.components.forEach((component, index) => {
            if (component.name === name) {
                this.components[index].value = value
                unreached = false
            }
        })
        if (unreached)
            throw new MemoLaboError(`La composante ${name} n'existe pas dans le système de couleur ${this.constructor.name}.`)
    }

    public getName(): string {
        return this.name
    }

    // Donne la liste des noms des composants
    public getComponentNames(): string[] {
        return this.components.map(component => {
            return component.name
        })
    }

    // Donne le modèle de la couleur
    public getModel(): ColorModelType {
        const model: ColorModelType = {}
        this.components.forEach(component => {
            model[component.name] = component.value
        })
        return model
    }

    public getComponents(): Array<ColorModelComponent> {
        return this.components
    }

    // Getter d'un composant
    public getComponent(name: string): ColorModelComponent {
        this.components.forEach(component => {
            if (component.name === name) {
                return component
            }
        })
        throw new MemoLaboError(`La composante ${name} n'existe pas dans le système de couleur ${this.constructor.name}.`)
    }

    // Fonction toString()
    toString(): string {
        let colorValues = new Array<number>()
        this.components.forEach(component => {
            colorValues.push(component.value)
        })
        return this.constructor.name + '(' + colorValues.join(', ') + ')'
    }
}

class ColorModelComponent {

    // Constantes
    private static DEFAULT_MIN_VALUE: number = 0
    private static DEFAULT_MAX_VALUE: number = 100

    // Propriétés
    readonly name: string
    readonly label : string
    readonly code: string
    readonly minValue: number
    readonly maxValue: number
    readonly valuePrecision: number
    private _value: number = 0

    // Constructeur
    public constructor(
        name: string,
        value: number,
        options?: {
            label?: string,
            code?: string,
            min?: number,
            max?: number,
            step?: number
        }
    ) {
        // NAME
        if (name.isEmptyOrSpaces()) {
            throw new MemoLaboError("Le nom ne peut pas être une chaine vide.")
        }
        this.name = name.trim().toLowerCase()
        // LABEL
        this.label = options?.label?.isEmptyOrSpaces() ? options?.label?.trim() : this.name.ucFirst()
        // CODE
        this.code = options?.code?.length == 1 ? options?.code : this.label.charAt(0)
        // MIN VALUE
        this.minValue = options?.min ?? Math.min(value, ColorModelComponent.DEFAULT_MIN_VALUE)
        // MAX VALUE
        this.maxValue = options?.max ?? Math.max(value, ColorModelComponent.DEFAULT_MAX_VALUE)
        // CHECK MIN & MAX VALUES
        if (this.minValue > this.maxValue) {
            throw new MemoLaboError("La valeur minimale ne peut pas être supérieure à la valeur maximale.")
        }
        // VALUE PRECISION
        this.valuePrecision = options?.step ?? value.getPrecision()
        if (this.valuePrecision <= 0) {
            throw new MemoLaboError("La valeur de précision doit être supérieure à 0.")
        }
        if (this.valuePrecision > this.maxValue - this.minValue) {
            throw new MemoLaboError("La valeur de précision ne peut pas être supérieure à la différence entre la valeur maximale et minimale.")
        }
        // VALUE
        this.value = value
    }

    // Getter value
    public get value(): number {
        return this._value
    }

    // Setter value
    public set value(value: number) {
        // garantie que la nouvelle valeur reste dans les bornes min et max
        this._value = Math.min(this.maxValue, Math.max(this.minValue, value))
        // garantie que la nouvelle valeur respecte la précision
        if (this._value % this.valuePrecision != 0) {
            this._value = Math.round(this.value * this.valuePrecision + Number.EPSILON) / this.valuePrecision
        }
    }
}

export { type ColorModelType, type IColorModel, BaseColorModel, ColorModelComponent }