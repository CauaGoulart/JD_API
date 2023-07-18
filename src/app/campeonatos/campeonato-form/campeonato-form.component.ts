import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../models/campeonato';
import { CampeonatoService } from '../service/campeonato.service';

@Component({
  selector: 'app-campeonato-form',
  templateUrl: './campeonato-form.component.html',
  styleUrls: ['./campeonato-form.component.scss']
})
export class CampeonatoFormComponent implements OnInit {
  public campeonatos!: Campeonato[];
  public campeonato = {} as Campeonato;

  constructor(private service: CampeonatoService) { }

  public addCampeonato() {
    this.service.adiciona(this.campeonato).subscribe((data) => {

    })
  }

  public updateCampeonato() {
    this.service.update(this.campeonato).subscribe((data) => {

    })
  }

  public limparFormulario() {
    this.campeonato = {
      id: 0,
      descricao: "",
      ano:0
    };
  }

  getCampeonatosByName(name: string) {
    this.service.getCampeonatosByName(name).subscribe((campeonatos) => {
      this.service.editar = false;
      this.campeonato = campeonatos[0];
    });
  }

  ngOnInit(): void {
    this.service.Campeonatoselecionado.subscribe(campeonato => {
      this.campeonato = campeonato;
    });
  }

}
