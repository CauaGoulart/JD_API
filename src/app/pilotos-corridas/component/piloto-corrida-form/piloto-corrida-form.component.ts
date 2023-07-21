import { Component, OnInit } from '@angular/core';
import { Piloto } from '../../../pilotos/models/piloto';
import { Corrida } from '../../../corridas/models/corrida';
import { PilotoCorrida } from '../../models/piloto-corrida';
import { PilotoCorridaService } from '../../service/piloto-corrida.service';
import { PilotoService } from '../../../pilotos/service/piloto.service';
import { CorridaService } from '../../../corridas/service/corrida.service';

@Component({
  selector: 'app-piloto-corrida-form',
  templateUrl: './piloto-corrida-form.component.html',
  styleUrls: ['./piloto-corrida-form.component.scss']
})
export class PilotoCorridaFormComponent implements OnInit{

  public id!: number;
  public pilotoId: number | null = null;
  public pilotoSelecionado: Piloto | null = null;
  public pilotos: Piloto[] = [];
  public corridaId: number | null = null;
  public corridaSelecionada: Corrida | null = null;
  public corridas: Corrida[] = [];
  public pilotoCorrida = {} as PilotoCorrida;

  constructor(
    private service: PilotoCorridaService,
    private pilotoService: PilotoService,
    private corridaService: CorridaService
  ){}

  ngOnInit(): void {
    this.service.selectPilotoCorridaEvent.subscribe((data) => {
      this.pilotoCorrida = data;
    });
    this.pilotoService.listAll().subscribe((data) => {
      this.pilotos = data;
    });
    this.corridaService.listAll().subscribe((data) => {
      this.corridas = data;
    });
  }

  public insert(){

    if(this.pilotoCorrida.id != null){
      this.service.update(this.pilotoCorrida).subscribe((data) => {
        this.pilotoCorrida = data;
        this.pilotoCorrida = {} as PilotoCorrida;
      });
    } else {
      this.service.insert(this.pilotoCorrida).subscribe((data) => {
        this.pilotoCorrida = data;
        this.pilotoCorrida = {} as PilotoCorrida;
      })
    }
  }

  public getByCorridaOrderByColocacao(){
    if (this.corridaId != null) {
    this.service.findByCorridaOrderByColocacao(this.corridaId);
    }
  }

  public getPilotoCorridaByPiloto() {
    if (this.pilotoId != null) {
    this.service.findByPiloto(this.pilotoId);
    }
  }

  public getPilotoCorridaByCorrida() {
    if (this.corridaId != null) {
    this.service.findByCorrida(this.corridaId);
    }
  }
}
