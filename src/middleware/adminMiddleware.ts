import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authorize requests based on user role.
 * 
 * This middleware MUST run AFTER the `authMiddleware`, as it depends on the
 * `req.user` object being populated with the authenticated user's data,
 * including their roles.
 * 
 * It checks if the user's roles array includes 'admin'.
 * If not, it rejects the request with a 403 Forbidden status.
 *
 * @param req - The Express request object, expected to have a `user` property.
 * @param res - The Express response object.
 * @param next - The Express next middleware function.
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if the req.user object exists and has been populated by authMiddleware
  if (!req.user || !req.user.roles) {
    // This indicates a server-side configuration error (middleware out of order)
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'User data is not available on the request. Ensure authMiddleware runs first.',
    });
  }

  // Check if the user's roles array includes the 'admin' role
  const isAdmin = req.user.roles.includes('admin');

  if (!isAdmin) {
    // The user is authenticated but not authorized for this resource
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied. Administrator privileges are required.',
    });
  }

  // If the user is an admin, proceed to the next handler
  next();
};