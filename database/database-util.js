let sep = ','

export async function insertToDataBase(db, recipe) {
    let cookingSteps = recipe['cookingSteps'];
    let spices = recipe['spices'];
    let ingredients = recipe['ingredients'];
    await db.run(`
        INSERT INTO recipe (
            id,
            description,
            cookingTime,
            name,
            category,
            picture,
            servings,
            kcal,
            cookingSteps,
            spices,
            ingredients
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [
            recipe['id'],
            recipe['description'],
            recipe['cookingTime'],
            recipe['name'],
            recipe['category'],
            recipe['picture'],
            recipe['servings'],
            recipe['kcal'],
            Array.isArray(cookingSteps) ? cookingSteps.join(sep) : cookingSteps,
            Array.isArray(spices) ? spices.join(sep) : spices,
            Array.isArray(ingredients) ? ingredients.join(sep) : ingredients,
    ]);
}

export async function findById(db, id) {
    const recipe = await db.get(`SELECT * FROM recipe WHERE id = ?`, `${ id }`);
    return {
        ...recipe,
    }
}

