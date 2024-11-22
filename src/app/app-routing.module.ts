import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Importer les routes définies dans app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Charger les routes
  exports: [RouterModule],  // Exporter le module de routage pour qu'il soit accessible dans le projet
})
export class AppRoutingModule {}
