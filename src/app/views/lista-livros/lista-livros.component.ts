import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { listStateTrigger } from 'src/app/animations';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  animations: [listStateTrigger]
})
export class ListaLivrosComponent implements AfterViewInit {

  private readonly PAUSA = 500;
  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;
  @ViewChild('CampoBuscaElement') campoBuscaElement: ElementRef;

  constructor(private service: LivroService) { }

  ngAfterViewInit() {
    this.campoBuscaElement.nativeElement.focus()
}

  livrosEncontrados$: Observable<LivroVolumeInfo[]> = this.campoBusca.valueChanges
    .pipe(
      debounceTime(this.PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo inicial')),
      distinctUntilChanged(),
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
      tap(console.log),
      map((resultado: LivrosResultado) => {
        this.livrosResultado = resultado;
        return resultado.items ?? [];
      }),
      map((items: Item[]) => this.livrosResultadoParaLivros(items)),
      catchError(() => throwError(() => new Error(this.mensagemErro = `Ops, ocorreu um erro! Recarregue a aplicação!`)))
    );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}



