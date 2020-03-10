import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GetOptions {
    id?: number;
    query?: any;
    url?: string;
}

export interface PostOptions {
    data: any;
    id?: number;
    url?: string;
}

export abstract class CrudMethods {
    protected http: HttpClient;
    protected entity: string;

    public constructor() { }

    /**
    * Gets data from an ApiRoute
    * @param id (OPTIONAL) {number | boolean} Get with specified Id
    * @param queryParams (OPTIONAL) {any} Get with query params
    */
    public get(options: GetOptions = {}): Observable<any> {
        return this.http.get(`${environment.baseUrl}/api/${this.entity}${options.id ? `/${options.id}` : ''}${options.url ? `/${options.url}` : ''}`, { params: options.query } || {});
    }

    /**
    * Posts data to an ApiRoute
    * @TODO Trocar os parametros pelo PostOptions já criado como interface
    * @param data {any}
    */
    public post(data: any, id: number | boolean = false): Observable<any> {
        return this.http.post(`${environment.baseUrl}/api/${this.entity}${id ? `/${id}` : ''}`, data);
    }

    /**
    * Deletes entities data with a specified Id
    * @param id {number}
    */
    public delete(id: number): Observable<any> {
        return this.http.delete(`${environment.baseUrl}/api/${this.entity}/${id}/delete`);
    }

    /**
    * Changes entity data with a specified Id
    * @param data { id: number, [attributes: string]: any }
    */
    public update(data: { id: number, [attributes: string]: any }): Observable<any> {
        return this.http.put(`${environment.baseUrl}/api/${this.entity}/${data.id}/edit`, data);
    }

}