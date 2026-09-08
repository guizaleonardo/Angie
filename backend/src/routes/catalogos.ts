import { Router } from 'express';
import { getCatalog, publicCatalog, requireCatalog } from '../catalog/index.js';
import { asyncHandler, ok } from '../http.js';

export const catalogosRouter = Router();

catalogosRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const ids = ['hospitalaria', 'ambulatoria', 'principal'] as const;
    ok(
      res,
      ids.map((id) => {
        const c = getCatalog(id);
        return {
          id: c.id,
          bloques: c.bloques.length,
          items: c.items.length,
          bloquesTransversales: c.bloquesTransversales,
          bloquesServicio: c.bloquesServicio,
          meta: c.meta,
        };
      }),
    );
  }),
);

catalogosRouter.get(
  '/:modalidad',
  asyncHandler(async (req, res) => {
    ok(res, publicCatalog(requireCatalog(req.params.modalidad)));
  }),
);

catalogosRouter.get(
  '/:modalidad/servicios/:codigo/items',
  asyncHandler(async (req, res) => {
    const catalog = requireCatalog(req.params.modalidad);
    const items = catalog.items.filter(
      (item) => catalog.codigosTransversales.has(item.bloque) || item.bloque === req.params.codigo,
    );
    ok(res, {
      servicio: catalog.nombreBloque[req.params.codigo] || req.params.codigo,
      items,
    });
  }),
);
