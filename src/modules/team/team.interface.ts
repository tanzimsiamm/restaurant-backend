import { Document } from 'mongoose';

export interface ITeam {
  name: string;
  position: string;
  image: string;
  bio?: string;
  order: number;
  isActive: boolean;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeamDocument extends ITeam, Document {}