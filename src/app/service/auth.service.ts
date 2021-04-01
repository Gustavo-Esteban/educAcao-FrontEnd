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
}
