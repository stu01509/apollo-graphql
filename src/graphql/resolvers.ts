import RecipeSchema from '../models/recipe';

const resolvers = {
    Query: {
      async getRecipe(_: any, { ID }: any) {
        return await RecipeSchema.findById(ID);
      },
      async getRecipes(_: any, __: any) {
        return await RecipeSchema.find().sort({ createdAt: -1 }).limit(__.amount);
      },
    },
    Mutation: {
      async createRecipe(_: any, { recipeInput }: any) {
        const { name, description } = recipeInput;
        const recipe = new RecipeSchema({
            name,
            description,
            thumbsUp: 0,
            thumbsDown: 0,
        });
        const result = await recipe.save();
        return result;
      },
      async deleteRecipe(_: any, { ID }: any) {
        const isDeleted = (await RecipeSchema.deleteOne({ _id: ID })).deletedCount;
        return isDeleted;
      },
      async updateRecipe(_: any, { ID, recipeInput }: any) {
        const { name, description } = recipeInput;
        const isUpdated = (await RecipeSchema.updateOne({ _id: ID }, { name, description })).modifiedCount;
        return isUpdated;
      }
    }
};

export default resolvers;