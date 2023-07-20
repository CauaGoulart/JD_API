import { Component, OnInit } from '@angular/core';
import { Piloto } from '../../models/piloto';
import { PilotoService } from '../../service/piloto.service';

@Component({
  selector: 'app-piloto-table',
  templateUrl: './piloto-table.component.html',
  styleUrls: ['./piloto-table.component.scss']
})
export class PilotoTableComponent implements OnInit {
  public pistas!: Piloto[];

  constructor(private service: PilotoService) { }

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.pistas = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pistas = data;
      });
    });

    this.service.getPilotosSubject().subscribe((pistas) => {
      this.pistas = pistas;
    });
  }


  public deleteItem(pista: Piloto) {
    this.service.deleteItem(pista).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pistas = data;
      });
    });
  }

  public setPilotoselecionado(pista: any) {
    this.service.setPilotoselecionado(pista);

  }

}

