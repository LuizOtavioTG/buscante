import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError } from 'rxjs';
import { LivroComponent } from '../../componentes/livro/livro.component';
import { LivrosResultado, Item } from '../../models/interfaces';
import { LivroService } from '../../service/livro.service';
import { LivroVolumeInfo } from '../../models/livroVolumeInfo';


const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  imports: [
    CommonModule,
    LivroComponent,
    ReactiveFormsModule
  ],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css'
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = ''
  livrosResultado!: LivrosResultado;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => {
      if (valorDigitado.trim() === '') {
        return EMPTY;
      } else {
        return this.service.buscar(valorDigitado);
      }
    }),
    tap((resultado) => {
      this.livrosResultado = resultado;
    }),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(() => {
      this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!';
      return throwError(() => new Error(this.mensagemErro));
    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}
