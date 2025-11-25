import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SliderValidation } from "./slider.validation";
import { SliderController } from "./slider.controller";

const router = Router();

router.post(
  "/",
  validateRequest(SliderValidation.createSliderValidationSchema),
  SliderController.createSlider
);

router.get("/", SliderController.getAllSliders);

router.get("/:id", SliderController.getSliderById);

router.patch(
  "/:id",
  validateRequest(SliderValidation.updateSliderValidationSchema),
  SliderController.updateSlider
);

router.delete("/:id", SliderController.deleteSlider);

export const SliderRoutes = router;
