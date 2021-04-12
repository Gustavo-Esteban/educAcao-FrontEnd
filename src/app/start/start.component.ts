import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  user: Usuario = new Usuario
  confirmarSenha: string

  userLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    window.scroll(0,0)

  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value

  }
  cadastrar(){

    if(this.user.senha != this.confirmarSenha){
        this.alertas.showAlertDanger('As senhas estão incorretas!')
    }
    else{

      if(this.user.foto == null || this.user.foto == ''){
        this.user.foto = 'https://i.imgur.com/2fNwmra.png'
      }

      this.authService.cadastrar(this.user).subscribe((resp: Usuario)=> {
        this.user = resp

        this.alertas.showAlertSuccess('Usuario cadastrado com sucesso!')
      })
    }
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp:UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipo
      this.router.navigate(['/home'])
    }, erro =>{
      if(erro.status == 500){
        this.alertas.showAlertDanger('Usuario ou senha  estão incorretos!')
      }
    })
  }

  esqueceuSenha(){
    this.alertas.showAlertSuccess('Email enviado com sucesso!')
  }

}
