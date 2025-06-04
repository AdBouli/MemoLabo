import { ColorModelComponent } from "@/models/GlossCraft/ColorModels/Base/ColorModelComponent"
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

export type { ColorModelType, IColorModel }
