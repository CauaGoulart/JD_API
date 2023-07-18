import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Pais } from '../models/pais';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private urlBase: string = "http://localhost:8080/pais"
  public editar: boolean = false;
  public Countryselecionado = new EventEmitter<Pais>();
  public updateTableEvent = new EventEmitter<void>();
  private paises: Pais[] = [];
  private paisSubject = new Subject<Pais[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getCountry(): Observable<Pais[]> {
    this.http.get<Pais[]>(this.urlBase)
      .subscribe(paises => this.paisSubject.next(paises));
    return this.paisSubject.asObservable();
  }

  private setUsers(paises: Pais[]) {
    this.paises = paises;
    this.paisSubject.next(paises);
  }

  public adiciona(user: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.getCountry();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(user: Pais): Observable<Pais> {
    return this.http.put<Pais>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.getCountry();
        this.updateTableEvent.emit();
      })
    );
  }

  public deleteItem(user: Pais): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, this.httpOptions);
  }

  public setCountryselecionado(user: Pais) {
    this.Countryselecionado.emit(user);
    this.editar = true;
  }

  public getCountrysByName(name: string): Observable<Pais[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http.get<Pais[]>(url)
      .subscribe(paises => this.paisSubject.next(paises));
    return this.paisSubject.asObservable();
  }
}
