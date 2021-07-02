import { Adapter } from "../adapters/pokemon";
import { Injectable } from "@angular/core";

export class Pokemon {
  constructor(
    public id: Number, 
    public abilities: Array<string>,
    public forms: Array<string>,
    public name: String,
    public types: Array<string>,
    public height: Number,
    public weight: Number,
    public image: String
  ){}
  }
  
  @Injectable({
    providedIn: "root",
  })
  export class PokemonAdapter implements Adapter<Pokemon> {
    adapt(item: any): Pokemon {
      return new Pokemon(item.id, item.abilities, item.forms, item.name, item.types, item.height, item.weight, item.sprites.other['official-artwork']['front_default']);
    }
  }