import { Router, Request, Response, NextFunction } from 'express';
// import { UserController } from '../controllers/userController';
// import { validateDto } from '../middleware/validationMiddleware';
// import { UserRegistrationDto } from '../dtos/user.dto';

const router = Router();
// const userController = new UserController();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/users/register', /* validateDto(UserRegistrationDto), */ (req: Request, res: Response) => {
  // const user = await userController.register(req.body);
  res.status(201).json({ message: 'User registered successfully', userId: 'user_abc123' });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile information for a specific user by their ID.
 *     responses:
 *       200:
 *         description: A user object.
 */
router.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // const userProfile = await userController.getProfile(id);
  res.status(200).json({ id, name: 'John Doe', email: 'john.doe@example.com', memberSince: new Date() });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Updates the profile information for a specific user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
router.put('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // const updatedUser = await userController.updateProfile(id, req.body);
  res.status(200).json({ message: `User ${id} updated successfully.` });
});

export { router as userRoutes };