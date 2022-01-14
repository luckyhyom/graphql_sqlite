export const createRecipeTable = `
    CREATE TABLE recipe (
        id varchar(36) NOT NULL,
        description varchar(200) NOT NULL,
        cookingTime int NOT NULL,
        name varchar(100) NOT NULL,
        category varchar(100) NOT NULL,
        picture varchar(2083) NOT NULL,
        servings int NOT NULL,
        kcal int NOT NULL,
        cookingSteps TEXT NOT NULL,
        spices TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        PRIMARY KEY (id)
)`