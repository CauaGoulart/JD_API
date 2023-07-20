import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Equipe } from '../models/equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private urlBase: string = "http://localhost:8080/equipe"
  public editar: boolean = false;
  public Equipeselecionada = new EventEmitter<Equipe>();
  public updateTableEvent = new EventEmitter<void>();
  private equipes: Equipe[] = [];
  private equipesSubject = new Subject<Equipe[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  listAll(): Observable<Equipe[]> {
    this.http.get<Equipe[]>(this.urlBase)
      .subscribe(equipes => this.equipesSubject.next(equipes));
    return this.equipesSubject.asObservable();
  }

  public adiciona(user: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(user: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public deleteItem(user: Equipe): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, this.httpOptions);
  }

  public setEquipeselecionada(user: Equipe) {
    this.Equipeselecionada.emit(user);
    this.editar = true;
  }

  public getEquipeByName(name: string): Observable<Equipe[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http.get<Equipe[]>(url)
      .subscribe(equipes => this.equipesSubject.next(equipes));
    return this.equipesSubject.asObservable();
  }
}
