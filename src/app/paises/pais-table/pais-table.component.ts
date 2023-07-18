import { Component, OnInit } from '@angular/core';
import { Pais } from '../models/pais';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-pais-table',
  templateUrl: './pais-table.component.html',
  styleUrls: ['./pais-table.component.scss']
})
export class PaisTableComponent implements OnInit {
  public paises!: Pais[];

  constructor(private service: CountryService) { }

  ngOnInit(): void {
    this.service.getCountry().subscribe((data) => {
      this.paises = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.getCountry().subscribe((data) => {
        this.paises = data;
      });
    });
  }


  public deleteItem(pais: Pais) {
    this.service.deleteItem(pais).subscribe(() => {
      this.service.getCountry().subscribe((data) => {
        this.paises = data;
      });
    });
  }

  public setCountryselecionado(pais: any) {
    this.service.setCountryselecionado(pais);

  }

}