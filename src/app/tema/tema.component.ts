import { AlertasService } from './../service/alertas.service';
import { TemaService } from './../service/tema.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTema: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token ==''){
      this.alertas.showAlertInfo('Sua sessão inspirou. Faça o login novamente!')
      this.router.navigate(['/start'])
    }
    this.findAllTema()
  }
  findAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>[
      this.listaTema = resp
    ])
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess( 'tema cadastrado com sucesso!')
      this.findAllTema()
      this.tema = new Tema()
    })
  }

}
