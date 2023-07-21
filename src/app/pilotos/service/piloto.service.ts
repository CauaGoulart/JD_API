import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Piloto } from '../models/piloto';
import { Pais } from '../../paises/models/pais';
import { CountryService } from '../../paises/service/country.service';
import { EquipeService } from 'src/app/equipes/service/equipe.service';
import { Equipe } from 'src/app/equipes/models/equipe';
import { LoginService } from '../../login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {
  private urlBase: string = "http://localhost:8080/piloto"
  public editar: boolean = false;
  public pilotoSelecionado = new EventEmitter<Piloto>();
  public updateTableEvent = new EventEmitter<void>();
  private pilotoSubject = new Subject<Piloto[]>();
  private pilotosSubject = new BehaviorSubject<Piloto[]>([]);

  constructor(private http: HttpClient, private countryService: CountryService, private equipeService: EquipeService, private loginService: LoginService) { }

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Piloto[]>{
    this.http.get<Piloto[]>(this.urlBase, this.getHttpOptions()).subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  countryListAll(): Observable<Pais[]> {
    return this.countryService.listAll();
  }

  equipeListAll(): Observable<Equipe[]> {
    return this.equipeService.listAll();
  }

  public getPilotosSubject(): Observable<Piloto[]> {
    return this.pilotosSubject.asObservable();
  }

  public adiciona(piloto: Piloto): Observable<Piloto> {
    return this.http.post<Piloto>(this.urlBase, piloto, this.getHttpOptions()).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(piloto: Piloto): Observable<Piloto> {
    return this.http.put<Piloto>(this.urlBase, piloto, this.getHttpOptions()).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public atualizarPilotos(pilotos: Piloto[]): void {
    this.pilotosSubject.next(pilotos);
  }

  public deleteItem(piloto: Piloto): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${piloto.id}`, this.getHttpOptions());
  }

  public setPilotoselecionado(piloto: Piloto) {
    this.pilotoSelecionado.emit(piloto);
    this.editar = true;
  }

  public getPilotosByName(name: string): Observable<Piloto[]> {
    let url = `${this.urlBase}/nome/${name}`;
    this.http.get<Piloto[]>(url)
      .subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }
  
  getPilotosByPais(idPais: number): Observable<Piloto[]> {
    const url = `${this.urlBase}/pais/${idPais}`;
    return this.http.get<Piloto[]>(url);
  }

  getPilotosByEquipe(idEquipe: number): Observable<Piloto[]> {
    const url = `${this.urlBase}/equipe/${idEquipe}`;
    return this.http.get<Piloto[]>(url);
  }
}
