import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon, PokemonAdapter } from '../models/pokemon';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class pokemonService {
  private apiBase = `https://pokeapi.co/api/v2/pokemon`;
  constructor(
    private http: HttpClient,
    private adapter: PokemonAdapter
    ) {}

    allPokemon(name:string): Promise<any> {
      let context = this;
      const url = `${this.apiBase}?limit=1118`;
      return this.http.get(url)
      .toPromise()
      .then(function(data:any){
        let matched: any = [];
        let results = data.results;
        for (let i = 0; i < results.length; i++) {
          let spliturl = results[i].url.split("pokemon/")[1].replace("/", "");
          context.pokemonDetail(spliturl).subscribe( detail => {
            if(detail['name'].includes(name)){
              matched.push(spliturl);
            } else {
              // 
            }
          })
        }
        return matched
      })
      }


  pokemonDetail(id:number): Observable<Pokemon> {
    const url = `${this.apiBase}/${id}/`;
    return this.http.get(url)
    .pipe(
      map((item: any) =>  this.adapter.adapt(item)))
        }
      }
