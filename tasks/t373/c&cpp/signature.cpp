/**
 * @brief Convert SQL WHERE clause infix expression to prefix expression
 *
 * @param whereClause SQL WHERE clause string in infix notation
 *                    Examples: "age > 20 AND name = 'Alice'"
 *                             "(price < 100 OR category = 'books') AND available = true"
 *                             "score BETWEEN 80 AND 100"
 *
 * @return std::string Prefix expression string where operators precede their operands
 *         Examples: "AND > age 20 = name 'Alice'"
 *                  "AND OR < price 100 = category 'books' = available true"
 *                  "BETWEEN score 80 100"
 */
#include <string>

std::string sqlWhereToPrefix(const std::string& whereClause);
