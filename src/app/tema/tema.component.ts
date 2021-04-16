import Swal from 'sweetalert2';
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
    private temaService: TemaService
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
      Swal.fire({
        icon: 'success',
        title: 'Muito bom',
        text: 'Tema cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 2000
      })
      this.findAllTema()
      this.tema = new Tema()
    })
  }

}
