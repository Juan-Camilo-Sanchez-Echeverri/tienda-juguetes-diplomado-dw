import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'toys/:id',
    renderMode: RenderMode.Server,      // ← aquí
  },
  {
    path: 'admin/edit/:id',
    renderMode: RenderMode.Server,      // ← y aquí
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,   // SSG tal como ya tenías
  },
];
