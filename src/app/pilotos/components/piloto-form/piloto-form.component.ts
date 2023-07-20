import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/paises/models/pais';
import { CountryService } from 'src/app/paises/service/country.service';
import { Equipe } from '../../../equipes/models/equipe';
import { PilotoService } from '../../service/piloto.service';
import { Piloto } from '../../models/piloto';

@Component({
  selector: 'app-piloto-form',
  templateUrl: './piloto-form.component.html',
  styleUrls: ['./piloto-form.component.scss']
})
export class PilotoFormComponent {
  public paises: Pais[] = [];
  public equipes: Equipe[] = [];
  public pilotos!: Piloto[];
  public piloto = {} as Piloto;
  public paisSelecionado: Pais | null = null;
  public equipeSelecionado: Equipe | null = null;
  public filtrar = false;
  public paisId: number | null = null;
  public equipeId: number | null = null;


  constructor(private pilotoService: PilotoService, private countryService: CountryService) { }

  public insert() {
    if (this.paisSelecionado) {
      this.piloto.pais = this.paisSelecionado;
      this.pilotoService.adiciona(this.piloto).subscribe((data) => {

      });
    }
    this.limparFormulario()
  }

  public updatePista() {
    if (this.paisSelecionado) {
      this.piloto.pais = this.paisSelecionado;
      this.pilotoService.update(this.piloto).subscribe((data) => {
      });
    }
  }

  public Filtrar() {
    this.filtrar = !this.filtrar;
  }

  public limparFormulario() {
    this.piloto = {
      id: 0,
      name: "",
      pais: {
        id: 0,
        name: ""
      },
      equipe: {
        id: 0,
        name: ""
      }
    };
  }

  getPistaByName(name: string) {
    this.pilotoService.getPilotosByName(name).subscribe((pilotos) => {
      this.pilotoService.editar = false;
      this.piloto = pilotos[0];
    });
  }

  public getPilotosByPais() {
    if (this.paisId !== null) {
      this.pilotoService.getPilotosByPais(this.paisId).subscribe((pilotos) => {

        this.pilotoService.atualizarPilotos(pilotos);
      });
    }
  }

  public getPilotosByEquipe() {
    if (this.equipeId !== null) {
      this.pilotoService.getPilotosByPais(this.equipeId).subscribe((pilotos) => {

        this.pilotoService.atualizarPilotos(pilotos);
      });
    }
  }

  ngOnInit(): void {
    this.pilotoService.pilotoSelecionado.subscribe(piloto => {
      this.piloto = piloto;
    });

    this.pilotoService.countryListAll().subscribe((data) => {
      this.paises = data;
    });
  }

  onChangePais() {

    this.getPilotosByPais();
  }

}
