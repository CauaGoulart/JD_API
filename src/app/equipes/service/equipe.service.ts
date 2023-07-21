import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Equipe } from '../models/equipe';
import { LoginService } from '../../login/service/login.service';

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

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Equipe[]>{
    this.http.get<Equipe[]>(this.urlBase, this.getHttpOptions()).subscribe((equipes) => this.equipesSubject.next(equipes));
    return this.equipesSubject.asObservable();
  }

  public adiciona(user: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.urlBase, user, this.getHttpOptions()).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(user: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(this.urlBase, user, this.getHttpOptions()).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public deleteItem(user: Equipe): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, this.getHttpOptions());
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
