import { Postagem } from "./Postagem"

export class Usuario{
  public id: number
  public nomeCompleto: string
  public email: string
  public senha: string
  public foto: string
  public postagem: Postagem[]
  public tipo: string = 'normal'
}
