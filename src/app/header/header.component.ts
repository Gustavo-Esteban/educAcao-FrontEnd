import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  id = environment.id


  constructor(
    private router: Router
  ) { }

  ngOnInit() {




  }
  sair(){
    this.router.navigate(['/start'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }


}
