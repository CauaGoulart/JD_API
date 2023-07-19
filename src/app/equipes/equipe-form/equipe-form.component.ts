import { Component } from '@angular/core';
import { Equipe } from '../models/equipe';
import { EquipeService } from '../service/equipe.service';

@Component({
  selector: 'app-equipe-form',
  templateUrl: './equipe-form.component.html',
  styleUrls: ['./equipe-form.component.scss']
})
export class EquipeFormComponent {

  public equipes!: Equipe[];
  public equipe = {} as Equipe;

  constructor(private service: EquipeService) { }

  public addEquipe() {
    this.service.adiciona(this.equipe).subscribe((data) => {

    })
  }

  public updatecountry() {
    this.service.update(this.equipe).subscribe((data) => {

    })
  }

  public limparFormulario() {
    this.equipe = {
      id: 0,
      name: "",
    };
  }

  getEquipeByName(name: string) {
    this.service.getEquipeByName(name).subscribe((equipes) => {
      this.service.editar = false;
      this.equipe = equipes[0];
    });
  }

  ngOnInit(): void {
    this.service.Equipeselecionada.subscribe(equipe => {
      this.equipe = equipe;
    });
  }

}
