import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $appName: string
        $authorName: string
        $authorEmail: string
    }
}
