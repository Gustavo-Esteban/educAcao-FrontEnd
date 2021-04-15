import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment.prod"
import { Comentario } from "../model/Comentario"

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllComentarios(): Observable<Comentario[]> {
  return this.http.get<Comentario[]>(`${environment.server}${environment.port}/comentarios`, this.token)
  }

  getByIdComentario(id: number): Observable<Comentario>{
    return this.http.get<Comentario>(`${environment.server}${environment.port}/comentarios/${id}`, this.token)
  }

  postComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${environment.server}${environment.port}/comentarios`, comentario, this.token)
  }

  putComentario(comentario: Comentario): Observable<Comentario>{
    return this.http.put<Comentario>(`${environment.server}${environment.port}/comentarios`, comentario, this.token)
  }

  deleteComentario(id: number){
    return this.http.delete(`${environment.server}${environment.port}/comentarios/${id}`, this.token)
  }

}
