import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto




  constructor() { }

  ngOnInit() {

    if(this.foto == null || this.foto == ''){
      this.foto = '../../assets/img/user.png'
    }


  }

}
