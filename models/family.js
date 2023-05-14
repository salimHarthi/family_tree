import { Schema, model, models } from 'mongoose';

const FamilySchema = new Schema({
  familyName: String,
  flow: {
    edges: [],
    nodes: [],
    viewport: [],
  },
  users: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
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
  public: {
    type: Boolean,
    default: false,
  },
});

const Family = models.Family || model('Family', FamilySchema);

export default Family;
