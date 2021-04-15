import { Postagem } from "./Postagem"
import { Comentario } from "./Comentario"

export class Usuario{
  public id: number
  public nomeCompleto: string
  public email: string
  public senha: string
  public foto: string
  public postagem: Postagem[]
  public tipo: string = 'adm'
  public comentario: Comentario[]
}
