import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {

    if(this.foto == null || this.foto == ''){
      this.foto = '../../assets/img/user.png'
    }

    // if(environment.token ==''){
    //   alert('Sua sessão inspirou. Faça o login novamente!')
    //   this.router.navigate(['/start'])
    // }

  }

}
