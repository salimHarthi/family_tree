import { Schema, model, models } from 'mongoose';

const FamilyMemebersSchema = new Schema({
  firstName: String,
  LastName: String,
  family: [{ type: Schema.Types.ObjectId, ref: 'Family' }],
  image: {
    type: String,
  },
});

const FamilyMemebers =
  models.FamilyMemebers || model('FamilyMemebers', FamilyMemebersSchema);

export default FamilyMemebers;

// probably will not need it
