import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  url_host: any = environment.apiUrl;

  constructor(public http: HttpClient,) { }

  fnHttpGetTareas(): Observable<any> {
    return this.http.get(this.url_host + 'todos',
      {
        observe: 'response',
        reportProgress: true,
      });
  }

  fnHttpCrearTarea(object_send): Observable<any> {
    return this.http.post(this.url_host + 'todos', object_send,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

  fnHttpActualizarTarea(object_send): Observable<any> {
    return this.http.put(this.url_host + 'todos/' + object_send.id , object_send,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

  fnHttpEliminarTarea(object_send): Observable<any> {
    return this.http.delete(this.url_host + 'todos/' + object_send.id,
      {
        observe: 'response',
        reportProgress: true,
      });
  }

}
