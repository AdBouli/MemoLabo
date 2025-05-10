export function setGlobalProperties(app: any): void {

    app.config.globalProperties.$appName = 'Memo Labo'
    app.config.globalProperties.$authorName = 'Adrien BOULINEAU'
    app.config.globalProperties.$authorEmail = 'adbouli@vivaldi.net'

    app.config.globalProperties.$fmtNum = (value: number, precision: number = 3): string => {
        if (value === null || value === undefined || isNaN(value)) return '0.00'
        return value.toLocaleString('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: precision
        })
    }
}
