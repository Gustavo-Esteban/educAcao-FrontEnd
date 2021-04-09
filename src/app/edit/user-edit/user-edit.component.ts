import { AlertasService } from './../../service/alertas.service';
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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/header'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar(){

    if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('A senhas estão incorretas.')
    } else{
      this.authService.atualizar(this.user).subscribe((resp: Usuario) => {
          this.user = resp
          this.router.navigate(['/start'])
          this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')
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
