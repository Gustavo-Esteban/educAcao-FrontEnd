import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }

    entrar(userLogin: UserLogin): Observable<UserLogin>{
      return this.http.post<UserLogin>(`${environment.server}${environment.port}/usuarios/logar`, userLogin)
    }

    cadastrar(user: Usuario ): Observable<Usuario>{
      return this.http.post<Usuario>(`${environment.server}${environment.port}/usuarios/cadastrar`, user)
    }

    atualizar(user: Usuario): Observable<Usuario> {
      return this.http.put<Usuario>('http://localhost:8080/usuarios', user,
      {headers: {'Authorization': environment.token}})
    }

    getByIdUser(id: number): Observable<Usuario>{
      return this.http.get<Usuario>(`${environment.server}${environment.port}/usuarios/${id}`, {headers: {'Authorization': environment.token}})

    }

    logado(){
      let ok: boolean = false

      if(environment.token != ''){
        ok = true
      }

      return ok
    }
    adm(){
      let ok: boolean = false

      if(environment.tipo == 'adm'){
        ok = true
      }

      return ok
    }
}
