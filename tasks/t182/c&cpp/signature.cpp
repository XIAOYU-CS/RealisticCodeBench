/**
 * The recipe ID is hashed to produce a price in the specified range
 *
 * @param recipeId - The ID of the recipe to hash.
 * @param minVal - The minimum value of the price range (default is 10).
 * @param maxVal - The maximum value of the price range (default is 30).
 * @returns - The hashed price, mapped to the specified range with two decimal places.
 */
#include <string>

double hash_recipe_id_to_price(const std::string& recipeId, double minVal = 10.0, double maxVal = 30.0);
