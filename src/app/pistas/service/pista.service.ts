import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Pista } from '../models/pista';
import { Pais } from 'src/app/paises/models/pais';
import { CountryService } from 'src/app/paises/service/country.service';
import { LoginService } from '../../login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class PistaService {
  private urlBase: string = "http://localhost:8080/pistas"
  public editar: boolean = false;
  public Pistaselecionado = new EventEmitter<Pista>();
  public updateTableEvent = new EventEmitter<void>();
  private pistaSubject = new Subject<Pista[]>();
  private pistasSubject = new BehaviorSubject<Pista[]>([]);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private countryService: CountryService,private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Pista[]>{
    this.http.get<Pista[]>(this.urlBase, this.getHttpOptions()).subscribe((pistas) => this.pistasSubject.next(pistas));
    return this.pistasSubject.asObservable();
  }

  countryListAll(): Observable<Pais[]> {
    return this.countryService.listAll();
  }

  public getPistasSubject(): Observable<Pista[]> {
    return this.pistasSubject.asObservable();
  }

  public adiciona(pista: Pista): Observable<Pista> {
    return this.http.post<Pista>(this.urlBase, pista, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(pista: Pista): Observable<Pista> {
    return this.http.put<Pista>(this.urlBase, pista, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public atualizarPistas(pistas: Pista[]): void {
    this.pistasSubject.next(pistas);
  }

  public deleteItem(pista: Pista): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${pista.id}`, this.httpOptions);
  }

  public setPistaselecionado(pista: Pista) {
    this.Pistaselecionado.emit(pista);
    this.editar = true;
  }

  public getPistasByName(name: string): Observable<Pista[]> {
    let url = `${this.urlBase}/nome/${name}`;
    this.http.get<Pista[]>(url)
      .subscribe(pistas => this.pistaSubject.next(pistas));
    return this.pistaSubject.asObservable();
  }

  public getPistasByTamanho(tamInicial: number, tamFinal: number): Observable<Pista[]> {
    let url = `${this.urlBase}/tamanho/${tamInicial}/${tamFinal}`;
    this.http.get<Pista[]>(url)
      .subscribe(pistas => this.pistaSubject.next(pistas));
    return this.pistaSubject.asObservable();
  }

  getPistasByPais(idPais: number): Observable<Pista[]> {
    const url = `${this.urlBase}/pais/${idPais}`;
    return this.http.get<Pista[]>(url);
  }
}
