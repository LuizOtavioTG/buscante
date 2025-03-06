import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { Livro } from '../../models/interfaces';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  livro = input<Livro>();
  statusModal: boolean = true;
  mudouModal = output<boolean>();

  constructor() { }

  fecharModal() {
    this.statusModal = false
    this.mudouModal.emit(this.statusModal)
  }

  lerPrevia() {
    window.open(this.livro()?.previewLink, '_blank');
  }

  get thumbnailUrl() {
    return this.livro()?.thumbnail || 'assets/imagens/capa-indisponivel.png';
  }
}
