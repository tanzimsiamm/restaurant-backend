import { Document } from 'mongoose';

export interface ISlider {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  thumbnailImage?: string; // Add thumbnail for hero section
  buttonText?: string;
  buttonLink?: string;
  bgColor?: string; // Add background color for hero section
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISliderDocument extends ISlider, Document {}