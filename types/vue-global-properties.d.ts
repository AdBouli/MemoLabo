import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $appName: string;
        $authorName: string;
        $authorEmail: string;
        $fmtNum: (value: number, precision?: number) => string;
        // Déclarez ici toutes vos propriétés globales, exemples :
        // $apiUrl: string;
        // $formatDate: (date: Date) => string;
    }
}
