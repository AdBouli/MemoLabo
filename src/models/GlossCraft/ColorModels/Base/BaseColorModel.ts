import type { IColorModel, ColorModelType } from "@/models/GlossCraft/ColorModels/Base/IColorModel"
import { ColorModelComponent } from "@/models/GlossCraft/ColorModels/Base/ColorModelComponent"
import { MemoLaboError } from '@/utils/MemoLaboError'
import type { RGBType } from "@/models/GlossCraft/ColorModels/RGB"

abstract class BaseColorModel implements IColorModel {

    // Propriétés
    private name: string
    private components: ColorModelComponent[]

    // Constructeur
    constructor(
        name: string,
        components: ColorModelComponent[]
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

    public getComponents(): ColorModelComponent[] {
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
        let colorValues: string[] = []
        this.components.forEach(component => {
            colorValues.push(component.code + ":" + component.value)
        })
        return this.constructor.name + '(' + colorValues.join(', ') + ')'
    }
}


export { BaseColorModel }