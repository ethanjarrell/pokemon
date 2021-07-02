import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { pokemonService } from '../../services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';



@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})


export class PokemonCardComponent implements AfterViewInit, OnChanges {
  @Input('poke') poke: any;
  public favorites: number[] = [];
  public results: any[] = [];
  public pokeDetail: any = {};
  public clicked: boolean = false;
  public id: number = 0;
  public pokeArr: any[] = [];
  constructor(
    private pokemonService: pokemonService
  ) { }
  ngAfterViewInit(): void {
    
    let getPokemon = () =>{
      let context = this;
      let results : Object[] = [];
      let favoritePokemon = localStorage.getItem('favorite');
      if (favoritePokemon != null){
        let favJSON = JSON.parse(favoritePokemon);
        if (favJSON && favJSON.length > 0){
          for (let i = 1; i < favJSON.length; i++) {
            console.log(favJSON[i]);
            context.pokemonService.pokemonDetail(parseInt(favJSON[i])).subscribe( data => {
              let newPokemon = data;
              results.push(newPokemon);
            });
          }
        } else {
          for (let i = 1; i < 6; i++) {
            context.pokemonService.pokemonDetail(i).subscribe( data => {
              let newPokemon = data;
              results.push(newPokemon);
            });
          }
        }
      }
      
      
      
      return results
    }

    this.results = getPokemon();
  }

  ngOnChanges(): void{
    
    let searchPokemon = () =>{
      let context = this;
      let results : Object[] = [];
      this.pokeArr = this.poke;
      setTimeout(function(){ 
        context.pokeArr.forEach(poke => {
          console.log(poke);
          context.pokemonService.pokemonDetail(parseInt(poke)).subscribe( data => {
            let newPokemon = data;
            console.log(data);
            results.push(newPokemon);
          });
        });
      }, 1000);
      return results
    }

    this.results = searchPokemon();
  }
  

  getDetails = (id:number) =>{
    let poke = this.results;
    for (let i = 0; i < poke.length; i++) {
      if(poke[i]['id'] == id){
        this.pokeDetail = poke[i];
        this.clicked = true;
        this.id = poke[i]['id'];
      }
    }
  }

  closeModal = () =>{
    this.pokeDetail = {};
    this.clicked = false;
    console.log(this.clicked);
  }

  addFavorite = (id:number) =>{
    if(this.favorites.length < 6 && (this.favorites.includes(id) == false)){
      this.favorites.push(id);
    }
    localStorage.setItem('favorite', JSON.stringify(this.favorites));
    console.log(localStorage.getItem('favorite'));
  }

}
