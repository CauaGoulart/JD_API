import { Component } from '@angular/core';
import { Pais } from '../models/pais';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html',
  styleUrls: ['./pais-form.component.scss']
})
export class PaisFormComponent {
  public countrys!: Pais[];
  public country = {} as Pais;

  constructor(private service: CountryService) { }

  public addCountry() {
    this.service.adiciona(this.country).subscribe((data) => {

    })
  }

  public updatecountry() {
    this.service.update(this.country).subscribe((data) => {

    })
  }

  public limparFormulario() {
    this.country = {
      id: 0,
      name: "",
    };
  }

  getCountrysByName(name: string) {
    this.service.getCountrysByName(name).subscribe((countrys) => {
      this.service.editar = false;
      this.country = countrys[0];
    });
  }

  ngOnInit(): void {
    this.service.Countryselecionado.subscribe(country => {
      this.country = country;
    });
  }

}
