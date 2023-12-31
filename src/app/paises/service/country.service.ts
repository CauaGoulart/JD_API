import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Pais } from '../models/pais';
import { LoginService } from '../../login/service/login.service';

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

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Pais[]>{
    this.http.get<Pais[]>(this.urlBase, this.getHttpOptions()).subscribe((paises) => this.paisSubject.next(paises));
    return this.paisSubject.asObservable();
  }

  public adiciona(user: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.urlBase, user, this.getHttpOptions()).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(user: Pais): Observable<Pais> {
    return this.http.put<Pais>(this.urlBase, user, this.getHttpOptions()).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public deleteItem(user: Pais): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, this.getHttpOptions());
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
