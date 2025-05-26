export class MemoLaboError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "MemoLaboError"
    }
    static isMemoLaboError(error: unknown): error is MemoLaboError {    
        return error instanceof MemoLaboError
    }
}