import { Router, Request, Response } from 'express';
// import { ProductController } from '../controllers/productController';

const router = Router();
// const productController = new ProductController();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Fetches a list of all available products or services.
 *     responses:
 *       200:
 *         description: A list of products.
 */
router.get('/products', (req: Request, res: Response) => {
  // const products = await productController.getAll();
  const products = [
    { id: 'prod_001', name: 'Basic Plan', price: 9.99, currency: 'USD' },
    { id: 'prod_002', name: 'Premium Plan', price: 29.99, currency: 'USD' },
  ];
  res.status(200).json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product
 *     description: Retrieves details for a specific product by its ID.
 *     responses:
 *       200:
 *         description: A single product object.
 *       404:
 *         description: Product not found.
 */
router.get('/products/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // const product = await productController.getById(id);
  res.status(200).json({ id, name: 'Premium Plan', price: 29.99, currency: 'USD' });
});

export { router as productRoutes };