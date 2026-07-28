#include <cstddef>
#include <functional>
#include <map>
#include <string>
#include <variant>
#include <vector>

struct Page;

using PageItems = std::vector<Page>;
using PageValue = std::variant<std::nullptr_t, int, std::string, PageItems>;

struct Page : public std::map<std::string, PageValue> {
    using std::map<std::string, PageValue>::map;
};

/**
 * @brief Build a tree structure from flat page data with optional sorting functionality.
 *
 * @param pages Flat page dictionaries. Each page must contain a non-null "id".
 * @param sort_fn Optional comparator returning negative/zero/positive like JavaScript sort.
 * @return Root pages, each with an "items" child list.
 */
std::vector<Page> build_tree_with_sort(
    const std::vector<Page>& pages,
    std::function<int(const Page&, const Page&)> sort_fn = nullptr);
