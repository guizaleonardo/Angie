import type { AccessScope, PublicUser } from '../auth/types.js';

declare global {
  namespace Express {
    interface Request {
      auth?: PublicUser;
      scope?: AccessScope;
    }
  }
}

export {};
