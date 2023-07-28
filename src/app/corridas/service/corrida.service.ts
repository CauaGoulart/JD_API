import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Corrida } from '../models/corrida';
import { LoginService } from '../../login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {
  private urlBase: string = 'http://localhost:8080/corrida';
  public selectCorridaEvent = new EventEmitter();
  private corridasSubject = new Subject<Corrida[]>();
  public corridaSubject = new Subject<Corrida>();
  public updateTableEvent = new EventEmitter<void>();
  public corridaSelecionado = new EventEmitter<Corrida>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Corrida[]>{
    this.http.get<Corrida[]>(this.urlBase, this.getHttpOptions()).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findByData(data: string): Observable<Corrida[]>{
    let url = `${this.urlBase}/data?data=${data}`;
    this.http.get<Corrida[]>(url, this.getHttpOptions()).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findByDataBetween(dataInicial: string, dataFinal: string): Observable<Corrida[]>{
    let url = `${this.urlBase}/between?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    this.http.get<Corrida[]>(url, this.getHttpOptions()).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findByPista(pistaId: number): Observable<Corrida[]>{
    let url = `${this.urlBase}/pista/${pistaId}`;
    this.http.get<Corrida[]>(url, this.getHttpOptions()).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findByCampeonato(campeonatoId: number): Observable<Corrida[]>{
    let url = `${this.urlBase}/campeonato/${campeonatoId}`;
    this.http.get<Corrida[]>(url, this.getHttpOptions()).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public insert(corrida: Corrida): Observable<Corrida>{
    return this.http.post<Corrida>(this.urlBase, JSON.stringify(corrida), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
      this.updateTableEvent.emit();
    }));
  }

  public update(corrida: Corrida): Observable<Corrida>{
    return this.http.put<Corrida>(`${this.urlBase}/${corrida.id}`, JSON.stringify(corrida), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
      this.updateTableEvent.emit();
    }));
  }

  public deleteItem(corrida: Corrida): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${corrida.id}`, this.getHttpOptions());
  }

  public getCorridaSelect(corrida: Corrida){
    this.selectCorridaEvent.emit(corrida); 
  }

  public setCorridaSelecionado(corrida: Corrida) {
    this.corridaSelecionado.emit(corrida);
  }

  public getCorridaSubject(): Observable<Corrida[]> {
    return this.corridasSubject.asObservable();
  }
}
