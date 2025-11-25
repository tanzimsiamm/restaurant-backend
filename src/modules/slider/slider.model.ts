import { Schema, model } from 'mongoose';
import { ISliderDocument } from './slider.interface';

const sliderSchema = new Schema<ISliderDocument>(
  {
    title: {
      type: String,
      required: [true, 'Slider title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [150, 'Subtitle cannot exceed 150 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Slider image is required'],
      trim: true,
    },
    buttonText: {
      type: String,
      trim: true,
      maxlength: [50, 'Button text cannot exceed 50 characters'],
    },
    buttonLink: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'Slider order is required'],
      min: [0, 'Order cannot be negative'],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
  },
);

// Index for better query performance
sliderSchema.index({ order: 1 });
sliderSchema.index({ isActive: 1 });

const Slider = model<ISliderDocument>('Slider', sliderSchema);

export default Slider;