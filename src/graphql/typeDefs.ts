import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Recipe {
    id: ID
    name: String
    description: String
    createdAt: String
    thumbsUp: Int
    thumbsDown: Int
  }

  input RecipeInput {
    name: String
    description: String
  }

  type Query {
    getRecipe(ID: ID!): Recipe
    getRecipes(amount: Int): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    updateRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
  }
`;

export default typeDefs;