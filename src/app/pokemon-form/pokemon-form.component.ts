import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import {FormBuilder, ReactiveFormsModule, Validators} from'@angular/forms'

@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.css'
})
export class PokemonFormComponent implements OnInit {
private formBuilder = inject(FormBuilder);
pokemonForm = this.formBuilder.nonNullable.group({
  name:['',Validators.required],
  type:['',Validators.required],
  level:[1 ,[Validators.required,
  Validators.min(1)]],
  nature:['',Validators.required]
})
pokemonService = inject(PokemonService);

ngOnInit(){
  this.pokemonService.fetchPokemon();
}
  onSubmit(){
    const data = this.pokemonForm.getRawValue();
    if (this.pokemonForm.invalid) return;
  this.pokemonService.savePokemon(data).subscribe({
    next: () => {
      this.pokemonService.fetchPokemon();
      this.pokemonForm.reset();
    }
      })
    
  }
}

