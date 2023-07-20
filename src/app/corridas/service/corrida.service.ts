import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Corrida } from '../models/corrida';
import { CampeonatoService } from '../../campeonatos/service/campeonato.service';
import { Campeonato } from '../../campeonatos/models/campeonato';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {
  private urlBase: string = "http://localhost:8080/corrida"
  public editar: boolean = false;
  public Corridaselecionado = new EventEmitter<Corrida>();
  public updateTableEvent = new EventEmitter<void>();
  private corridaSubject = new Subject<Corrida[]>();
  private corridasSubject = new BehaviorSubject<Corrida[]>([]);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private campeonatoService: CampeonatoService) { }

  listAll(): Observable<Corrida[]> {
    this.http.get<Corrida[]>(this.urlBase)
      .subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  campeonatoListAll(): Observable<Campeonato[]> {
    return this.campeonatoService.listAll();
  }

  public getCorridasSubject(): Observable<Corrida[]> {
    return this.corridasSubject.asObservable();
  }

  public adiciona(corrida: Corrida): Observable<Corrida> {
    return this.http.post<Corrida>(this.urlBase, corrida, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(corrida: Corrida): Observable<Corrida> {
    return this.http.put<Corrida>(this.urlBase, corrida, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public atualizarCorridas(corridas: Corrida[]): void {
    this.corridasSubject.next(corridas);
  }

  public deleteItem(corrida: Corrida): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${corrida.id}`, this.httpOptions);
  }

  public setCorridaselecionada(corrida: Corrida) {
    this.Corridaselecionado.emit(corrida);
    this.editar = true;
  }

  public getCorridasByData(date: string): Observable<Corrida[]> {
    let url = `${this.urlBase}/date/${date}`;
    this.http.get<Corrida[]>(url)
      .subscribe(corridas => this.corridaSubject.next(corridas));
    return this.corridaSubject.asObservable();
  }

  getCorridasByCampeonato(idCampeonato: number): Observable<Corrida[]> {
    const url = `${this.urlBase}/campeonato/${idCampeonato}`;
    return this.http.get<Corrida[]>(url);
  }
}
