import { Schema, model } from 'mongoose';
import { ITeamDocument } from './team.interface';

const teamSchema = new Schema<ITeamDocument>(
  {
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [100, 'Position cannot exceed 100 characters'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    order: {
      type: Number,
      required: [true, 'Order is required'],
      min: [0, 'Order cannot be negative'],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    socialLinks: {
      facebook: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
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
teamSchema.index({ order: 1 });
teamSchema.index({ isActive: 1 });

const Team = model<ITeamDocument>('Team', teamSchema);

export default Team;