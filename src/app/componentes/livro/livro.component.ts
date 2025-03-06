import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { AutoriaPipe } from '../../pipes/autoria.pipe';
import { Livro } from '../../models/interfaces';
import { ModalComponent } from '../../pages/modal/modal.component';

@Component({
  selector: 'app-livro',
  imports: [CommonModule, AutoriaPipe, ModalComponent],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {

  livro = input<Livro>();
  modalAberto: boolean = false;

  constructor() { }

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }

  get autores() {
    return this.livro()?.authors ?? [];
  }
}
