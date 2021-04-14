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

  constructor(

    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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

}
