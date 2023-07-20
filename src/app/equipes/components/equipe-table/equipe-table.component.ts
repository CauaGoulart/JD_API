import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../models/equipe';
import { EquipeService } from '../../service/equipe.service';

@Component({
  selector: 'app-equipe-table',
  templateUrl: './equipe-table.component.html',
  styleUrls: ['./equipe-table.component.scss']
})
export class EquipeTableComponent implements OnInit {
  public equipes!: Equipe[];

  constructor(private service: EquipeService) { }

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.equipes = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.equipes = data;
      });
    });
  }


  public deleteItem(equipe: Equipe) {
    this.service.deleteItem(equipe).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.equipes = data;
      });
    });
  }

  public setEquipeselecionada(equipe: any) {
    this.service.setEquipeselecionada(equipe);

  }

}
