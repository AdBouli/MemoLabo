import { all, create, type EvalFunction } from 'mathjs'

export class MathFunc {

    // Math.js
    private static math = create(all, {});

    // Générateur d'expression mathématiques
    private static* exprGen(): Generator<string> {
        let i = 0
        while (true) {
            yield `${++i}x`
        }
    }
    
    // Générateur de couleurs
    private static* colorGen(): Generator<string> {
        while (true) {
            yield "#FF8B7D"
            yield "#7DB3FF"
            yield "#FFB37D"
            yield "#7DF8FF"
        }
    }

    // Enregistrement des générateurs
    private static nextExpr = MathFunc.exprGen()
    private static nextColor = MathFunc.colorGen()

    // Usine à fonction
    public static create(expr: string = MathFunc.nextExpr.next().value): MathFunc
    {
        return new MathFunc(expr, MathFunc.nextColor.next().value)
    }

    // Propriétés
    expression: string
    color: string
    function: EvalFunction | null
    error: boolean

    // Constructeur
   private constructor(
        expression: string,
        color: string
    ) {
        this.expression = expression
        this.color = color
        this.function = null
        this.error = false
        this.compile()
    }

    // Compile l'expression
    compile() {
        try {
            const parsed = MathFunc.math.parse(this.expression)
            this.function = parsed.compile()
            this.error = false
        } catch (e) {
            this.function = null
            this.error = true
        }
    }

    // Évalue l'expression
    evaluate(scope: any): number {
        if (this.error) return NaN
        return this.function?.evaluate(scope)
    }

    // Retourne les variables de l'expression
    getVariables(): string[] {
        const variables: string[] = []
        MathFunc.math.parse(this.expression).filter((node: any) => {
            if (node.isSymbolNode) {
                variables.push(node.name)
            }
        })
        return variables
    }

}
