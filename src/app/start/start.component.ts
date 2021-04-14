import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  user: Usuario = new Usuario
  confirmarSenha: string

  userLogin: UserLogin = new UserLogin()

  nomeValido = false
  emailValido = false
  fotoValida = false
  senhaValida = false
  confirmaSenha = false

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  validaNome(event: any) {
    this.nomeValido = this.validar(event.target.value.length < 2 || event.target.value.length > 100, event)
  }

  validaEmail(event: any) {
    this.emailValido = this.validar(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.') == -1, event)
  }

  validaFoto(event: any) {
    let regex = /\.(jpe?g|png)$/i
    this.fotoValida = this.validar(!regex.test(event.target.value), event)
  }

  validaSenha(event: any) {
    this.senhaValida = this.validar(event.target.value.length < 5 || event.target.value.length > 40, event)
    this.confirmarSenha = event.target.value
  }

  validaConfirmaSenha(event: any) {
    this.confirmaSenha = this.validar(this.confirmarSenha != event.target.value, event)
  }

  validar(condicao: boolean, event: any) {
    let valido = false
    if (condicao) {
      event.target.classList.remove("is-valid")
      event.target.classList.add("is-invalid")
    } else {
      event.target.classList.remove("is-invalid")
      event.target.classList.add("is-valid")
      valido = true
    }
    return valido
  }

  cadastrar(){
    if(this.senhaValida != this.confirmaSenha){
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: 'As senhas não conferem',
        showConfirmButton: false,
        timer: 2000
      })
    } else{
      if(this.nomeValido && this.emailValido && this.senhaValida && this.confirmaSenha) {
        if(this.user.foto == '' || this.user.foto == null) {
          this.user.foto = 'https://i.imgur.com/2fNwmra.png'
        }
        this.authService.cadastrar(this.user).subscribe((resp: Usuario)=>{
          this.user = resp
          Swal.fire({
            icon: 'success',
            title: 'Muito bom',
            text: 'Usuário cadastrado com sucesso',
            showConfirmButton: false,
            timer: 1500
          })
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ocorreu um erro',
          text: 'Preencha os campos corretamente',
          showConfirmButton: false,
          timer: 2000
        })
      }
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
        Swal.fire({
          icon: 'error',
          title: 'Ocorreu um erro',
          text: 'E-mail e/ou senha incorreto(s)!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }

  esqueceuSenha(){
    Swal.fire({
      icon: 'info',
      title: 'Recurso em desenvolvimento',
      text: 'Desculpe-nos pelo transtorno',
      showConfirmButton: false,
      timer: 2200
    })
  }

}
