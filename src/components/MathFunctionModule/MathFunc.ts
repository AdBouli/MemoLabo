import { all, create, type EvalFunction } from 'mathjs'

export class MathFunc {
    
    private static math = create(all, {});

    private static* exprGen(): Generator<string> {
        let i = 0
        while (true) {
            yield `${++i}x`
        }
    }
    
    private static* colorGen(): Generator<string> {
        while (true) {
            yield "#FF8B7D"
            yield "#7DB3FF"
            yield "#FFB37D"
            yield "#7DF8FF"
        }
    }

    private static nextExpr = MathFunc.exprGen()
    private static nextColor = MathFunc.colorGen()

    public static create(expr:string = MathFunc.nextExpr.next().value): MathFunc
    {
        return new MathFunc(expr, MathFunc.nextColor.next().value)
    }
    
    expression: string
    color: string
    function: EvalFunction

   private constructor(
        expression: string,
        color: string
    ) {
        this.expression = expression
        this.color = color
        this.function = MathFunc.math.compile(this.expression)
    }

    compile(): void {
        this.function = MathFunc.math.compile(this.expression)
    }

    evaluate(scope: any): number {
        return this.function.evaluate(scope)
    }

    getVariables(): string[] {
        const variables: string[] = []
        const nodes = MathFunc.math.parse(this.expression).filter((node: any) => {
            if (node.isSymbolNode) {
                variables.push(node.name)
            }
        })
        return variables
    }

}
