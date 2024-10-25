import { Pipe } from "@angular/core";

@Pipe({name : 'trim',
    standalone: true

})
export class TrimPipe {

    transform(str: string, longitud: number): string {
        if (!str) {
            return '';
        }
        if (str.length > longitud) {
            return str.substring(0, longitud) + '...';
        } else {
            return str;
        }
    }



}