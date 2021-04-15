import { Usuario } from './../../model/Usuario';
import { Comentario } from './../../model/Comentario';
import { ComentarioService } from './../../service/comentario.service';
import Swal  from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { Postagem } from './../../model/Postagem';
import { Tema } from './../../model/Tema';
import { Router, ActivatedRoute } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-view',
  templateUrl: './tema-view.component.html',
  styleUrls: ['./tema-view.component.css']
})
export class TemaViewComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number
  listTemaPostagem : Postagem[]


  key = 'data'
  reverse = true


  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]

  postagem: Postagem = new Postagem()
  user: Usuario = new Usuario()
  idUser = environment.id
  idUserLogado = environment.id
  fotoUserLogado = environment.foto
  nomeUserLogado = environment.nome



  constructor(

    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private comentarioService: ComentarioService
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
      this.router.navigate(['/start'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp

      this.listTemaPostagem = []

      this.tema.postagem.forEach((i)=>{
        let video = this.sanitizer.bypassSecurityTrustResourceUrl(i.video)
        i.videoSeguro = video
        this.listTemaPostagem.push(i)
      })

    })
  }


  comentar(id: number){

    this.user.id = this.idUserLogado;
    this.comentario.usuario = this.user;

    this.postagem.id = id;
    this.comentario.postagem = this.postagem;

    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      Swal.fire({
        icon: 'success',
        title: 'Muito bom',
        text: 'Comentario realizada com sucesso!',
        showConfirmButton: false,
        timer: 2000
      })
      this.comentario = new Comentario();
      this.findByIdTema(this.idTema);
    }, err => {
      console.log(this.comentario)
    })

  }

  findallComentarios(){
    this.comentarioService.getAllComentarios().subscribe((resp: Comentario[])=>{
      this.listaComentarios = resp
    })
  }

  apagarComentario(id: number){
    this.comentarioService.deleteComentario(id).subscribe(() =>{
      Swal.fire({
        icon: 'success',
        title: 'Muito bom',
        text: 'Comentario apagado com sucesso!',
        showConfirmButton: false,
        timer: 2000
      })
      this.findByIdTema(this.idTema);
    });
  }

}
