import { Component, OnInit } from '@angular/core';
import { Pista } from '../../models/pista';
import { Pais } from 'src/app/paises/models/pais';
import { PistaService } from '../../service/pista.service';
import { CountryService } from 'src/app/paises/service/country.service';

@Component({
  selector: 'app-pista-form',
  templateUrl: './pista-form.component.html',
  styleUrls: ['./pista-form.component.scss']
})
export class PistaFormComponent implements OnInit {
  public paises: Pais[] = [];
  public pistas!: Pista[];
  public pista = {} as Pista;
  public paisSelecionado: Pais | null = null;
  tamInicial: number = 0;
  tamFinal: number = 0;
  public filtrar = false;
  public paisId: number | null = null;


  constructor(private pistaService: PistaService, private countryService: CountryService) { }

  public insert() {
    if (this.paisSelecionado) {
      this.pista.pais = this.paisSelecionado;
      this.pistaService.adiciona(this.pista).subscribe((data) => {

      });
    }
    this.limparFormulario()
  }

  public updatePista() {
    if (this.paisSelecionado) {
      this.pista.pais = this.paisSelecionado;
      this.pistaService.update(this.pista).subscribe((data) => {
      });
    }
  }

  public Filtrar() {
    this.filtrar = !this.filtrar;
  }

  public limparFormulario() {
    this.pista = {
      id: 0,
      nome: "",
      tamanho: 0,
      pais: {
        id: 0,
        name: ""
      }
    };
  }

  getPistaByName(name: string) {
    this.pistaService.getPistasByName(name).subscribe((pistas) => {
      this.pistaService.editar = false;
      this.pista = pistas[0];
    });
  }

  getPistasByTamanho(tamInicial: number, tamFinal: number) {
    this.pistaService.getPistasByTamanho(tamInicial, tamFinal).subscribe((pistas) => {
      this.pistaService.editar = false;
      this.pista = pistas[0];
    });
  }

  public getPistasByPais() {
    if (this.paisId !== null) {
      this.pistaService.getPistasByPais(this.paisId).subscribe((pistas) => {

        this.pistaService.atualizarPistas(pistas);
      });
    }
  }

  ngOnInit(): void {
    this.pistaService.Pistaselecionado.subscribe(pista => {
      this.pista = pista;
    });

    this.pistaService.getCountry().subscribe((data) => {
      this.paises = data;
    });
  }

  onChangePais() {

    this.getPistasByPais();
  }
}
