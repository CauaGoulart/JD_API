import { Component, OnInit } from '@angular/core';
import { Piloto } from '../../models/piloto';
import { PilotoService } from '../../service/piloto.service';

@Component({
  selector: 'app-piloto-table',
  templateUrl: './piloto-table.component.html',
  styleUrls: ['./piloto-table.component.scss']
})
export class PilotoTableComponent implements OnInit {
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

