import { Schema, model, models } from 'mongoose';

const FamiliesSchema = new Schema({
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
      userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
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
  creator: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
});

const Families = models.Families || model('Families', FamiliesSchema);

export default Families;
