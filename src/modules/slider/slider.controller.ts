import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SliderService } from './slider.service';

const createSlider = catchAsync(async (req: Request, res: Response) => {
  const result = await SliderService.createSlider(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Slider created successfully',
    data: result,
  });
});

const getAllSliders = catchAsync(async (req: Request, res: Response) => {
  const result = await SliderService.getAllSliders(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Sliders retrieved successfully',
    data: result,
  });
});

const getSliderById = catchAsync(async (req: Request, res: Response) => {
  const result = await SliderService.getSliderById(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Slider retrieved successfully',
    data: result,
  });
});

const updateSlider = catchAsync(async (req: Request, res: Response) => {
  const result = await SliderService.updateSlider(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Slider updated successfully',
    data: result,
  });
});

const deleteSlider = catchAsync(async (req: Request, res: Response) => {
  await SliderService.deleteSlider(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Slider deleted successfully',
    data: null,
  });
});

export const SliderController = {
  createSlider,
  getAllSliders,
  getSliderById,
  updateSlider,
  deleteSlider,
};