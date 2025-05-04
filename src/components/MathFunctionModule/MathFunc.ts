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
            yield "#F00"
            yield "#0F0"
            yield "#00F"
            yield "#FF0"
            yield "#0FF"
            yield "#F0F"
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

}
