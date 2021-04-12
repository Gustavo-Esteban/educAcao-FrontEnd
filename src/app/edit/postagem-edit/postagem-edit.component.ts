import { Usuario } from './../../model/Usuario';
import { environment } from './../../../environments/environment.prod';

import { AuthService } from './../../service/auth.service';
import { AlertasService } from './../../service/alertas.service';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private sanitizer: DomSanitizer,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {

    window.scroll(0,0)

    if(environment.token ==''){
      this.alertas.showAlertInfo('Sua sessão inspirou. Faça o login novamente!')
      this.router.navigate(['/start'])
    }

    let id= this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()

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

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem atualizada com sucesso')
      this.router.navigate(['/home'])
    })

  }

  videoembed() {
    this.videoNovo = this.postagem.video.replace("watch?v=", "embed/");
    this.videoSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoNovo);
  }
}
