#include <deque>
#include <unordered_set>
#include <algorithm>
#include <cstddef>

class UniqueDeque {
public:
    UniqueDeque() : _deque(), _set() {}

    bool add(int item) {
        if (_set.find(item) == _set.end()) {
            _deque.push_back(item);
            _set.insert(item);
            return true;
        }
        return false;
    }

    bool deleteItem(int item) {
        auto it = std::find(_deque.begin(), _deque.end(), item);
        if (it != _deque.end()) {
            _deque.erase(it);
            _set.erase(item);
            return true;
        }
        return false;
    }

    bool contains(int item) const {
        return _set.find(item) != _set.end();
    }

    std::size_t size() const {
        return _deque.size();
    }

    std::deque<int>::iterator begin() {
        return _deque.begin();
    }

    std::deque<int>::const_iterator begin() const {
        return _deque.begin();
    }

    std::deque<int>::iterator end() {
        return _deque.end();
    }

    std::deque<int>::const_iterator end() const {
        return _deque.end();
    }

private:
    std::deque<int> _deque;
    std::unordered_set<int> _set;
};
