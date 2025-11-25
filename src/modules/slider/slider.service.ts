import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { ISlider } from "./slider.interface";
import Slider from "./slider.model";

const createSlider = async (payload: ISlider) => {
  const result = await Slider.create(payload);
  return result;
};

const getAllSliders = async (query: { isActive?: string }) => {
  const filter: { isActive?: boolean } = {};

  if (query.isActive) {
    filter.isActive = query.isActive === "true";
  }

  const result = await Slider.find(filter).sort({ order: 1 });
  return result;
};

const getSliderById = async (id: string) => {
  const result = await Slider.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Slider not found");
  }

  return result;
};

const updateSlider = async (id: string, payload: Partial<ISlider>) => {
  const slider = await Slider.findById(id);

  if (!slider) {
    throw new AppError(StatusCodes.NOT_FOUND, "Slider not found");
  }

  const result = await Slider.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSlider = async (id: string) => {
  const slider = await Slider.findById(id);

  if (!slider) {
    throw new AppError(StatusCodes.NOT_FOUND, "Slider not found");
  }
  const result = await Slider.findByIdAndDelete(id);
  return result;
};
export const SliderService = {
  createSlider,
  getAllSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
};
