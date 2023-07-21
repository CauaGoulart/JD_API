import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoginService } from '../../login/service/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PilotoCorrida } from '../models/piloto-corrida';

@Injectable({
  providedIn: 'root'
})
export class PilotoCorridaService {
  private urlBase: string = 'http://localhost:8080/piloto_corrida';
  public selectPilotoCorridaEvent = new EventEmitter();
  private pilotosCorridasSubject = new Subject<PilotoCorrida[]>();
  public pilotoCorridaSubject = new Subject<PilotoCorrida>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<PilotoCorrida[]>{
    this.http.get<PilotoCorrida[]>(this.urlBase, this.getHttpOptions()).subscribe((data) => 
      this.pilotosCorridasSubject.next(data));
    return this.pilotosCorridasSubject.asObservable();
  }

  public findByPiloto(pilotoId: number): Observable<PilotoCorrida[]>{
    let url = `${this.urlBase}/piloto/${pilotoId}`;
    this.http.get<PilotoCorrida[]>(url, this.getHttpOptions()).subscribe(
      (data) => this.pilotosCorridasSubject.next(data));
    return this.pilotosCorridasSubject.asObservable();
  }

  public findByCorrida(corridaId: number): Observable<PilotoCorrida[]>{
    let url = `${this.urlBase}/corrida/${corridaId}`;
    this.http.get<PilotoCorrida[]>(url, this.getHttpOptions()).subscribe((data) => 
      this.pilotosCorridasSubject.next(data));
    return this.pilotosCorridasSubject.asObservable();
  }

  public findByCorridaOrderByColocacao(corridaId: number): Observable<PilotoCorrida[]>{
    let url = `${this.urlBase}/corrida_colocacao/${corridaId}`;
    this.http.get<PilotoCorrida[]>(url, this.getHttpOptions()).subscribe((data) => 
      this.pilotosCorridasSubject.next(data));
    return this.pilotosCorridasSubject.asObservable();
  }

  public insert(pilotoCorrida: PilotoCorrida): Observable<PilotoCorrida>{
    return this.http.post<PilotoCorrida>(this.urlBase, JSON.stringify(pilotoCorrida), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(pilotoCorrida: PilotoCorrida): Observable<PilotoCorrida>{
    return this.http.put<PilotoCorrida>(`${this.urlBase}/${pilotoCorrida.id}`, JSON.stringify(pilotoCorrida), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public delete(pilotoCorrida: PilotoCorrida): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${pilotoCorrida.id}`, this.getHttpOptions());
  }

  public getPilotoSelect(pilotoCorrida: PilotoCorrida){
    this.selectPilotoCorridaEvent.emit(pilotoCorrida); 
  }
}
