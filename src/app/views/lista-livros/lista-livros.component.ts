import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { listStateTrigger } from 'src/app/animations';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro';
const PAUSA = 300;


@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  animations: [listStateTrigger]
})

export class ListaLivrosComponent implements AfterViewInit {

  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;
  @ViewChild('CampoBuscaElement') campoBuscaElement: ElementRef;

  constructor(
    private service: LivroService,
    private liveAnnouncer: LiveAnnouncer
  ) { }

  ngAfterViewInit() {
    this.campoBuscaElement.nativeElement.focus()
}

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
      this.liveAnnouncer.announce(`${this.livrosResultado.totalItems} resultados encontrados`);
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



