import { Equipe } from "../../equipes/models/equipe";
import { Pais } from "../../paises/models/pais";

export interface Piloto {
    id: number,
    name: string,
    pais: Pais,
    equipe: Equipe
}
