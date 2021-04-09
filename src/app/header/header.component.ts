import { AuthService } from 'src/app/service/auth.service';
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
  tipo = environment.tipo


  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {


  }

  sair(){
    this.router.navigate(['/start'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
    environment.tipo =''
  }




}
