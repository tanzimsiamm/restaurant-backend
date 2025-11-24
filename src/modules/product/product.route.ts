import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";

const router = Router();

router.post(
  "/",
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.get("/slug/:slug", ProductController.getProductBySlug);

router.patch(
  "/:id",
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct
);

router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
