import { Tema } from "./Tema"
import { Usuario } from "./Usuario"

export class Postagem{
  public id: number
  public titulo: string
  public conteudo: string
  public imagem: string
  public video: string
  public referencia: string
  public data: Date
  public usuario: Usuario
  public tema: Tema
  public videoSeguro: any
}
