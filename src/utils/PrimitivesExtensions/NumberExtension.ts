if (!Number.prototype.decimalFormat) {
    Number.prototype.decimalFormat = function (precision: number) : string {
        const userLocale = navigator.language || navigator.languages?.[0] || 'fr-FR';
        return this.toLocaleString(userLocale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: precision
        })
    }
}

if (!Number.prototype.getPrecision) {
    Number.prototype.getPrecision = function () : number {
        const numStr = String(this);
        const decimalIndex = numStr.indexOf('.');
        // Pour les entiers, la précision est l'unité (1)
        if (decimalIndex === -1) return 1; 
        const precision = numStr.length - decimalIndex - 1;
        return Math.pow(10, -precision);
    }
}

if (!Number.prototype.isBetween) {
    Number.prototype.isBetween = function (a: number, b: number) : boolean {
        if (b < a) [a, b] = [b, a]
        return a <= this.valueOf() && this.valueOf() <= b
    }
}
