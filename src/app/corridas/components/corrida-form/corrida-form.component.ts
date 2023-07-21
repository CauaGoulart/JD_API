import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { Pista } from '../../../pistas/models/pista';
import { CorridaService } from '../../service/corrida.service';
import { CampeonatoService } from '../../../campeonatos/service/campeonato.service';
import { Campeonato } from '../../../campeonatos/models/campeonato';
import { PistaService } from '../../../pistas/service/pista.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-corrida-form',
  templateUrl: './corrida-form.component.html',
  styleUrls: ['./corrida-form.component.scss']
})
export class CorridaFormComponent implements OnInit {
  public corrida = {} as Corrida;
  public pistaSelecionada: Pista | null = null;
  public pistas: Pista[] = [];
  public campeonatoSelecionado: Campeonato | null = null;
  public campeonatos: Campeonato[] = [];
  public id!: number;
  public dataInicial!: string;
  public dataFinal!: string;
  public pistaId: number | null = null;
  public campeonatoId: number | null = null;

  constructor(
    private pistaService: PistaService,
    private campeonatoService: CampeonatoService,
    private service: CorridaService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.pistaService.listAll().subscribe((data) => {
      this.pistas = data;
    });
    this.campeonatoService.listAll().subscribe((data) => {
      this.campeonatos = data;
    })
    this.service.selectCorridaEvent.subscribe((data) => {
      this.corrida = data;
    })
  }

  public insert() {
    if (this.pistaSelecionada && this.campeonatoSelecionado) {
      this.corrida.pista = this.pistaSelecionada;
      this.corrida.campeonato = this.campeonatoSelecionado;
    }
    
    const dataFormatada = this.formataData(this.corrida.data);
    if (dataFormatada) {
      this.corrida.data = dataFormatada;
    }

    if (this.corrida.id != null) {
      this.service.update(this.corrida).subscribe((data) => {
        this.corrida = data;
        this.corrida = {} as Corrida;
      });
    } else {
      this.service.insert(this.corrida).subscribe((data) => {
        this.corrida = data;
        this.corrida = {} as Corrida;
      });
    }
  }

  public getCorridaByDataBetween() {
    const dataInicial = this.formataData(this.dataInicial);
    const dataFinal = this.formataData(this.dataFinal);
    if (dataInicial && dataFinal) {
      this.service.findByDataBetween(dataInicial, dataFinal);
    }
  }

  private formataData(data: string) {
    return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm');
  }

  public getCorridaByData() {
    const data = this.formataData(this.corrida.data);
    if (data) {
      this.service.findByData(data);
    }
  }

  public getCorridaByPista() {
    if (this.pistaId != null) {
      this.service.findByPista(this.pistaId);
    }
  }

  public getCorridaByCampeonato() {
    if (this.campeonatoId != null) {
      this.service.findByCampeonato(this.campeonatoId);
    }
  }
}
