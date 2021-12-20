import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class RickandmortyService {
  url: string = 'https://rickandmortyapi.com/api';
  constructor(private http: HttpClient) {}

  allCharacters(params?: {}): Observable<{ info: any; results: Character[] }> {
    return this.http.get<{ info: any; results: Character[] }>(
      `${this.url}/character`,
      { params }
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/character/${id}`);
  }
}
