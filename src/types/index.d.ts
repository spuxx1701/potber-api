import { Request } from 'express';

declare global {
  // Reexport `Request` with another name to prevent conflifts with Nest's `Request()` decorator. */
  export type ExpressRequest = Request;
}
