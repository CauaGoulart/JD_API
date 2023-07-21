import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../../service/campeonato.service';

@Component({
  selector: 'app-campeonato-table',
  templateUrl: './campeonato-table.component.html',
  styleUrls: ['./campeonato-table.component.scss']
})
export class CampeonatoTableComponent implements OnInit {
  public campeonatos!: Campeonato[];

  constructor(private service: CampeonatoService) { }

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.campeonatos = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.campeonatos = data;
      });
    });
  }


  public deleteItem(campeonato: Campeonato) {
    this.service.deleteItem(campeonato).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.campeonatos = data;
      });
    });
  }

  public setCampeonatoselecionado(campeonato: any) {
    this.service.setCampeonatoselecionado(campeonato);

  }

}


