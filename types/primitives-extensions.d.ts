declare global {
    interface String {
        /**
         * Checks if the string is empty or contains only whitespace characters.
         * @returns {boolean} True if the string is empty or contains only whitespace characters, false otherwise.
         */
        isEmptyOrSpaces(): boolean

        /**
         * Converts the first character of the string to uppercase.
         * @returns {string} The string with the first character converted to uppercase.
         */
        ucFirst(): string
    }

    interface Number {
        /**
         * Formats the number to a string with a specified number of decimal places.
         * @param {number} precision - The number of decimal places to format the number to.
         * @returns {string} The formatted number as a string.
         */
        decimalFormat(precision: number): string

        /**
         * Gets the precision of the number.
         * For example : 123 will retrurn 1 ; -1.23 will return 0.01
         * @returns {number} The precision of the number.
         */
        getPrecision(): number

        /**
         * Check if the number is between two values.
         * @param a {number}
         * @param b {number}
         * @returns True if the number is between a and b, false otherwise.
         */
        isBetween(a: number, b: number): boolean
    }
}

export {}
