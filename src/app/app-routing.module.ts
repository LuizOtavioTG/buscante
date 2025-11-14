import { ListaLivrosComponent } from './views/lista-livros/lista-livros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './views/contato/contato.component';
import { SobreComponent } from './views/sobre/sobre.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'lista-livros',
    pathMatch: 'full'
  },
  {
    path: 'lista-livros',
    component: ListaLivrosComponent,
    title: 'Busque um livro - Buscante'
  },
  {
    path: 'sobre',
    component: SobreComponent,
    title: 'Mais informações - Buscante'

  },
  {
    path: 'contato',
    component: ContatoComponent,
    title: 'Entre em contato - Buscante'
  },
  {
    path: '**',
    component: ListaLivrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
