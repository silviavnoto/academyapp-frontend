import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: false
};

//usuario.service
export const serverUrl = 'http://localhost:8085';

export const httpOptions = {
    headers: new HttpHeaders ({
        'Content-Type': 'application/json'
    }),
};