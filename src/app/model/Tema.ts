import { Postagem } from "./Postagem"

export class Tema{
  public id: number
  public nome: string
  public descricao: string
  public postagem: Postagem[]
}
