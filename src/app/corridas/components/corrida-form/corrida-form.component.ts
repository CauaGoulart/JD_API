import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { Pista } from '../../../pistas/models/pista';
import { CorridaService } from '../../service/corrida.service';
import { CampeonatoService } from '../../../campeonatos/service/campeonato.service';
import { Campeonato } from '../../../campeonatos/models/campeonato';

@Component({
  selector: 'app-corrida-form',
  templateUrl: './corrida-form.component.html',
  styleUrls: ['./corrida-form.component.scss']
})
export class CorridaFormComponent implements OnInit {
  public pistas: Pista[] = [];
  public campeonatos: Campeonato[] = [];
  public corridas!: Corrida[];
  public corrida = {} as Corrida;
  public pistaSelecionado: Pista | null = null;
  public campeonatoSelecionado: Campeonato | null = null;
  public filtrar = false;
  public campeonatoId: number | null = null;
  public pistaId: number | null = null;


  constructor(private corridaService: CorridaService, private campeonatoService: CampeonatoService) { }

  public insert() {
    if (this.pistaSelecionado) {
      this.corrida.pista = this.pistaSelecionado;
      this.corridaService.adiciona(this.corrida).subscribe((data) => {

      });
    }
    this.limparFormulario()
  }

  public updatePista() {
    if (this.pistaSelecionado) {
      this.corrida.pista = this.pistaSelecionado;
      this.corridaService.update(this.corrida).subscribe((data) => {
      });
    }
  }

  public Filtrar() {
    this.filtrar = !this.filtrar;
  }

  public limparFormulario() {
    this.corrida = {
      id: 0,
      data: "",
      pista: {
        id: 0,
        nome: "",
        tamanho: 0,
        pais: {
          id: 0,
          name: ""
        }
      },
      campeonato: {
        id: 0,
        descricao: "",
        ano: 0
      }
    };
  }

  getCorridaByDate(name: string) {
    this.corridaService.getCorridasByData(name).subscribe((corridas) => {
      this.corridaService.editar = false;
      this.corrida = corridas[0];
    });
  }

  public getCorridasByCampeonato() {
    if (this.campeonatoId !== null) {
      this.corridaService.getCorridasByCampeonato(this.campeonatoId).subscribe((corridas) => {

        this.corridaService.atualizarCorridas(corridas);
      });
    }
  }

  public getCorridasByPista() {
    if (this.pistaId !== null) {
      this.corridaService.getCorridasByCampeonato(this.pistaId).subscribe((corridas) => {

        this.corridaService.atualizarCorridas(corridas);
      });
    }
  }

  ngOnInit(): void {
    this.corridaService.Corridaselecionado.subscribe(corrida => {
      this.corrida = corrida;
    });

    this.corridaService.campeonatoListAll().subscribe((data) => {
      this.campeonatos = data;
    });
  }

  onChangeCorrida() {

    this.getCorridasByCampeonato();
  }
}
