import { Document, Types } from "mongoose";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: Types.ObjectId;
  images: string[];
  stock: number;
  tags?: string[];
  isFeatured: boolean;
  isActive: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductDocument extends IProduct, Document {}
