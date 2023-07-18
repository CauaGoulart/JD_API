import { EventEmitter, Injectable } from '@angular/core';
import { Campeonato } from '../models/campeonato';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {
  private urlBase: string = "http://localhost:8080/campeonato"
  public editar: boolean = false;
  public Campeonatoselecionado = new EventEmitter<Campeonato>();
  public updateTableEvent = new EventEmitter<void>();
  private campeonatos: Campeonato[] = [];
  private campeonatosSubject = new Subject<Campeonato[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getCampeonatos(): Observable<Campeonato[]> {
    this.http.get<Campeonato[]>(this.urlBase)
      .subscribe(campeonatos => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  private setCampeonatos(campeonatos: Campeonato[]) {
    this.campeonatos = campeonatos;
    this.campeonatosSubject.next(campeonatos);
  }

  public adiciona(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.post<Campeonato>(this.urlBase, campeonato, this.httpOptions).pipe(
      tap(() => {
        this.getCampeonatos();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(campeonato: Campeonato): Observable<Campeonato> {
    return this.http.put<Campeonato>(this.urlBase, campeonato, this.httpOptions).pipe(
      tap(() => {
        this.getCampeonatos();
        this.updateTableEvent.emit();
      })
    );
  }

  public deleteItem(campeonato: Campeonato): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${campeonato.id}`, this.httpOptions);
  }

  public setCampeonatoselecionado(campeonato: Campeonato) {
    this.Campeonatoselecionado.emit(campeonato);
    this.editar = true;
  }

  public getCampeonatosByName(name: string): Observable<Campeonato[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http.get<Campeonato[]>(url)
      .subscribe(campeonatos => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

}
