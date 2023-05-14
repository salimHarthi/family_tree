import { Schema, model, models } from 'mongoose';

const FamilySchema = new Schema({
  familyName: {
    type: String,
    required: [true, 'family name is required!'],
  },
  flow: {
    edges: [],
    nodes: [],
    viewport: [],
  },
  users: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      role: [
        {
          type: String,
          enum: ['view', 'edit'],
          default: 'view',
        },
      ],
    },
  ],
  logo: {
    type: String,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
});

const Family = models.Family || model('Family', FamilySchema);

export default Family;
