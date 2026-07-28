#include <map>
#include <string>
#include <vector>

using Record = std::map<std::string, std::string>;

std::vector<Record> sortByKey(const std::vector<Record>& array, const std::string& key);
