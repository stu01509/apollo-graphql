import { model , Schema } from 'mongoose';

const RecipeSchema = new Schema({
  name: String,
  description: String,
  thumbsUp: Number,
  thumbsDown: Number
}, {
  timestamps: {
    createdAt: 'createdAt',
  },
});

export default model('recipe', RecipeSchema, 'recipe');