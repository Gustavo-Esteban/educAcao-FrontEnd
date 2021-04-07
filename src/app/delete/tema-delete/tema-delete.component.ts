import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {


  tema: Tema = new Tema()
  idTema: number

  constructor(
    private TemaService: TemaService,
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
    this.TemaService.getByIdTema(id).subscribe((resp: Tema)=>[
      this.tema = resp
    ])

  }

  apagar(){
    this.TemaService.deleteTema(this.idTema).subscribe(()=>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })

  }

}
