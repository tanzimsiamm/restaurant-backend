import { Document } from 'mongoose';

export interface ICategory {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number; 
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryDocument extends ICategory, Document {}