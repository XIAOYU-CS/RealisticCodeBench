#include <map>
#include <string>
#include <variant>
#include <vector>

using FieldValue = std::variant<int, double, std::string>;
using Row = std::map<std::string, FieldValue>;

std::vector<Row> sort_by_field(const std::vector<Row>& array, const std::string& field, bool ascending = true);
