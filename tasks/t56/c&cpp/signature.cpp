#include <cstddef>
#include <deque>
#include <unordered_set>

class UniqueDeque {
public:
    UniqueDeque();
    bool add(int item);
    bool deleteItem(int item);
    bool contains(int item) const;
    std::size_t size() const;
    std::deque<int>::iterator begin();
    std::deque<int>::const_iterator begin() const;
    std::deque<int>::iterator end();
    std::deque<int>::const_iterator end() const;

private:
    std::deque<int> _deque;
    std::unordered_set<int> _set;
};
