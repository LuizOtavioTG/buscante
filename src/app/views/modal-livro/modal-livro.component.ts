import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { Livro } from 'src/app/models/interfaces';

const body = document.querySelector("body");

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.component.html',
  styleUrls: ['./modal-livro.component.css']
})
export class ModalLivroComponent {

  constructor(
    private renderer: Renderer2,
    private element: ElementRef
  ) { }

  @HostListener('document:keydown.escape') fecharModalAoPrecionarEsc(){
     if(this.statusModal) {
            this.fecharModal()
        }
  }

  @Input() livro: Livro;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter()

   fecharModal() {
        this.statusModal = false
        this.mudouModal.emit(this.statusModal)
        this.renderer.setStyle(
        this.element.nativeElement.ownerDocument.body, 'overflow', 'scroll')
    }

  esconderScroll(){
    if(this.statusModal == true ) {
      body.style.overflow = "hidden";
    }
  }
  
  lerPrevia() {
    window.open( this.livro.previewLink, '_blank');
  }

}
