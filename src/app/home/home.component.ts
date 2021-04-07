import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { PostagemService } from './../service/postagem.service';
import { TemaService } from './../service/tema.service';
import { Component, OnInit , VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';


import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  tema: Tema = new Tema()
  listaTema: Tema[]
  idTema: number

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]


  videoSeguro: any;
  videoNovo: string

  user: Usuario = new Usuario()
  idUser = environment.id

  foto = environment.foto
  nome = environment.nome


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {


    if(environment.token ==''){
      alert('Sua sessão inspirou. Faça o login novamente!')
      this.router.navigate(['/start'])
    }
    this.getAllTema()
    this.getAllPostagem()

  }

  getAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTema = resp
    })

  }
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }
  // getAllPostagem(){
  //   this.postagemService.getAllPostagens().subscribe((resp:Postagem[])=>{
  //     this.listaPostagem = []
  //     resp.forEach((i)=>{
  //       console.log(i.video)
  //       let video = this.sanitizer.bypassSecurityTrustResourceUrl(i.video)

  //       i.video = JSON.stringify(video)
  //       console.log(i.video)

  //       this.listaPostagem.push(i)
  //     })


  //   })

  // }

  getAllPostagem(){
    this.postagemService.getAllPostagens().subscribe((resp:Postagem[])=>{
      this.listaPostagem = resp
    })

  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario)=>{
      this.user = resp
    })

  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagem.video = this.videoNovo



    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!')

      this.postagem = new Postagem()
      this.getAllPostagem()

    })
  }

  videoembed() {
    this.videoNovo = this.postagem.video.replace("watch?v=", "embed/");
    this.videoSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoNovo);
  }



}
