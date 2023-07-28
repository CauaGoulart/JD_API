import { Component, OnInit } from '@angular/core';
import { PilotoService } from '../../../pilotos/service/piloto.service';
import { Piloto } from '../../../pilotos/models/piloto';

@Component({
  selector: 'app-piloto-corrida-table',
  templateUrl: './piloto-corrida-table.component.html',
  styleUrls: ['./piloto-corrida-table.component.scss']
})
export class PilotoCorridaTableComponent implements OnInit {
  public pilotos!: Piloto[];


  constructor(private service: PilotoService) { }

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.pilotos = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pilotos = data;
      });
    });

    this.service.getPilotosSubject().subscribe((pilotos) => {
      this.pilotos = pilotos;
    });
  }


  public deleteItem(piloto: Piloto) {
    this.service.deleteItem(piloto).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pilotos = data;
      });
    });
  }

  public setPilotoselecionado(piloto: any) {
    this.service.setPilotoselecionado(piloto);

  }

}

