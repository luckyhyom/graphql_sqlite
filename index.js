import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { ApolloServer, gql } from "apollo-server";

import recipes from "./database/temp/recipes.js";
import { recipeProps } from "./graphql/types.js";
import { insertToDataBase, findById } from "./database/database-util.js";
import { createRecipeTable } from "./database/tables.js"

let db;

(async function () {
  db = await open({
    filename: "./database/recipes.db",
    driver: sqlite3.Database,
  });

  await db.exec(`DROP TABLE IF EXISTS recipe`);

  await db.exec(createRecipeTable);

  for (const recipe of recipes) {
    await insertToDataBase(db, recipe)
  }
})();

const typeDefs = gql`
  type Recipe ${recipeProps}

  input RecipeData ${recipeProps}

  type Query {
    recipes: [Recipe]
    recipeById(recipeId: String!): Recipe!
  }

  type Mutation {
    addRecipe(id: ID!, content: RecipeData!): Recipe!
  }
`;

const resolvers = {
  Query: {
    recipes: async () => await db.all(`SELECT * FROM recipe`),

    recipeById: async (_, { recipeId }) => {
      return await findById(db, recipeId);
    },
  },

  Mutation: {
    addRecipe: async (_, { id, content }) => {
        id = Math.random().toString();
        await insertToDataBase(db, { id, ...content });
        return await findById(db, id);
      }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => console.log("Apollo GraphQL Server ready at", url));