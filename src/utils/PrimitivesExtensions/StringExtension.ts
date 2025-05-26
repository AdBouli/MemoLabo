if (!String.prototype.isEmptyOrSpaces) {
    String.prototype.isEmptyOrSpaces = function () : boolean {
            return this.trim() === ''
    }
}

if (!String.prototype.ucFirst) {
    String.prototype.ucFirst = function () : string {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
}
