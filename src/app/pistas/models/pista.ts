import { Pais } from "src/app/paises/models/pais";

export interface Pista {
    id: number,
    nome: string,
    tamanho: number,
    pais: Pais
}
