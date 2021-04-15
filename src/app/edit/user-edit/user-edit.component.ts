import Swal from 'sweetalert2';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  nomeValido = false
  emailValido = false
  fotoValida = false
  senhaValida = false
  confirmaSenha = false

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      Swal.fire({
        icon: 'info',
        title: 'Sua sessão inspirou',
        text: 'Faça o login novamente!',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/header'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  // confirmSenha(event: any) {
  //   this.confirmarSenha = event.target.value
  // }

  // tipoUser(event: any) {
  //   this.tipoUsuario = event.target.value
  // }


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

  atualizar(){

    if(this.senhaValida != this.confirmaSenha){
      Swal.fire({
        icon: 'error',
        title: 'As senhas estão incorretas',
        text: 'Tente novamente',
        showConfirmButton: false,
        timer: 2000
      })

    } else{
      this.authService.atualizar(this.user).subscribe((resp: Usuario) => {
          this.user = resp
          this.router.navigate(['/start'])
          Swal.fire({
            icon: 'success',
            title: 'Usuário atualizado com sucesso!',
            text: 'Faça o login novamente',
            showConfirmButton: false,
            timer: 2000
          })

          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0
          environment.tipo = ''

          this.router.navigate(['/start'])
      })
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

}
