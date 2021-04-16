import  Swal  from 'sweetalert2';
import { PostagemService } from './../../service/postagem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from 'src/app/model/Postagem';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService
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

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id:number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) =>{
      this.postagem = resp
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Muito bom',
        text: 'Postagem apagada com sucesso!',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/home'])
    })

  }

}
