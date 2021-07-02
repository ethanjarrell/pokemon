import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { pokemonService } from '../app/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Pokemon';
  slogan = "Gotta catch 'em all";
  poke: Number[] = [];
  constructor(
    private pokemonService: pokemonService
  ) { }

  ngOnInit() : void {
    console.log(localStorage.getItem('favorite'));
  }

  onEnter = (name:string) =>{
      let context = this;
      let pokeResults : number[] = [];
        context.pokemonService.allPokemon(name)
        .then(function(data){
          context.poke = data;
        });
      return pokeResults
  }
  }
