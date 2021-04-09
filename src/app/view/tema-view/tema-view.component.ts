import { PostagemService } from './../../service/postagem.service';
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


  key = 'data'
  reverse = true

  constructor(

    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua sessão inspirou. Faça o login novamente!')
      this.router.navigate(['/start'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)


  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>[
      this.tema = resp

    ])

  }

}
