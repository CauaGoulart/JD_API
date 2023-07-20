import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Piloto } from '../models/piloto';
import { Pais } from '../../paises/models/pais';
import { CountryService } from '../../paises/service/country.service';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {
  private urlBase: string = "http://localhost:8080/piloto"
  private urlPais: string = "http://localhost:8080/pais"
  public editar: boolean = false;
  public pilotoSelecionado = new EventEmitter<Piloto>();
  public updateTableEvent = new EventEmitter<void>();
  private pilotoSubject = new Subject<Piloto[]>();
  private pilotosSubject = new BehaviorSubject<Piloto[]>([]);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private countryService: CountryService) { }

  listAll(): Observable<Piloto[]> {
    this.http.get<Piloto[]>(this.urlBase)
      .subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  countryListAll(): Observable<Pais[]> {
    return this.countryService.listAll();
  }

  public getPilotosSubject(): Observable<Piloto[]> {
    return this.pilotosSubject.asObservable();
  }

  public adiciona(piloto: Piloto): Observable<Piloto> {
    return this.http.post<Piloto>(this.urlBase, piloto, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(piloto: Piloto): Observable<Piloto> {
    return this.http.put<Piloto>(this.urlBase, piloto, this.httpOptions).pipe(
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
    return this.http.delete<void>(`${this.urlBase}/${piloto.id}`, this.httpOptions);
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

  public getPilotosByTamanho(tamInicial: number, tamFinal: number): Observable<Piloto[]> {
    let url = `${this.urlBase}/tamanho/${tamInicial}/${tamFinal}`;
    this.http.get<Piloto[]>(url)
      .subscribe(pilotos => this.pilotoSubject.next(pilotos));
    return this.pilotoSubject.asObservable();
  }

  getPilotosByPais(idPais: number): Observable<Piloto[]> {
    const url = `${this.urlBase}/pais/${idPais}`;
    return this.http.get<Piloto[]>(url);
  }
}
