import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { SobreComponent } from './pages/sobre/sobre.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    CabecalhoComponent,
    RodapeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buscante';
}
