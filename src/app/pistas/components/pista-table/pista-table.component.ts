import { Component, OnInit } from '@angular/core';
import { Pista } from '../../models/pista';
import { PistaService } from '../../service/pista.service';

@Component({
  selector: 'app-pista-table',
  templateUrl: './pista-table.component.html',
  styleUrls: ['./pista-table.component.scss']
})
export class PistaTableComponent implements OnInit {
  public pistas!: Pista[];

  constructor(private service: PistaService) { }

  ngOnInit(): void {
    this.service.getPista().subscribe((data) => {
      this.pistas = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.getPista().subscribe((data) => {
        this.pistas = data;
      });
    });

    this.service.getPistasSubject().subscribe((pistas) => {
      this.pistas = pistas;
    });
  }


  public deleteItem(pista: Pista) {
    this.service.deleteItem(pista).subscribe(() => {
      this.service.getPista().subscribe((data) => {
        this.pistas = data;
      });
    });
  }

  public setPistaselecionado(pista: any) {
    this.service.setPistaselecionado(pista);

  }

}
