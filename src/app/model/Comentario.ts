import { Usuario } from './Usuario';
import { Postagem } from './Postagem';

export class Comentario {
  public id: number
  public usuario: Usuario
  public postagem: Postagem
  public comentario: string
  public data: Date
}
