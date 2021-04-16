import  Swal  from 'sweetalert2';
import { Usuario } from './../../model/Usuario';
import { environment } from './../../../environments/environment.prod';
import { AuthService } from './../../service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TemaService } from './../../service/tema.service';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTema: Tema[]
  idTema: number
  idUser = environment.id
  user: Usuario = new Usuario()
  listUserPostagem: Postagem[]

  videoSeguro: any;
  videoNovo: string

  imagemValida = false
  conteudoValido = false
  tituloValido = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token ==''){
      Swal.fire({
        icon: 'info',
        title: 'Sua sessão inspirou',
        text: 'Faça o login novamente!',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/start'])
    }

    let id= this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()

  }

  validaTitulo(event: any) {
    this.tituloValido = this.validar(event.target.value.length < 2 || event.target.value.length > 100, event)
  }

  validaConteudo(event: any) {
    this.conteudoValido = this.validar( event.target.value.length > 3000, event)
  }

  validaImagem(event: any) {
    let regex = /\.(jpe?g|png)$/i
    this.imagemValida = this.validar(!regex.test(event.target.value), event)
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


  findByIdPostagem(id:number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) =>{
      this.postagem = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario)=>{
      this.user = resp

      this.listUserPostagem = []

      this.user.postagem.forEach((i)=>{
        let video = this.sanitizer.bypassSecurityTrustResourceUrl(i.video)
        i.videoSeguro = video
        this.listUserPostagem.push(i)
      })

    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTema = resp
    })

  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.postagem.usuario = new Usuario()
    this.postagem.usuario.id = this.idUser
    this.postagem.video = this.videoNovo

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp

      console.log(this.postagem)
      Swal.fire({
        icon: 'success',
        title: 'Muito bom',
        text: 'Postagem atualizada com sucesso!',
        showConfirmButton: false,
        timer: 2000
      })

      this.router.navigate(['/home'])
    })

  }

  videoembed() {
    this.videoNovo = this.postagem.video.replace("watch?v=", "embed/");
    this.videoSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoNovo);
  }

}
