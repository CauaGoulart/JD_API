import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../service/corrida.service';

@Component({
  selector: 'app-corrida-table',
  templateUrl: './corrida-table.component.html',
  styleUrls: ['./corrida-table.component.scss']
})
export class CorridaTableComponent implements OnInit {
  public corridas!: Corrida[];

  constructor(private service: CorridaService) { }

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.corridas = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.corridas = data;
      });
    });

    this.service.getCorridasSubject().subscribe((corridas) => {
      this.corridas = corridas;
    });
  }


  public deleteItem(corrida: Corrida) {
    this.service.deleteItem(corrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.corridas = data;
      });
    });
  }

  public setCorridaselecionada(corrida: any) {
    this.service.setCorridaselecionada(corrida);

  }

}
