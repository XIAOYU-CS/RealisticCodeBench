
#include <algorithm>
#include <cstddef>
#include <initializer_list>
#include <iterator>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

template<typename T>
class ReadOnlyListProxy {
private:
    std::vector<T> _data;

public:
    ReadOnlyListProxy(const std::vector<T>& data) : _data(data) {}
    ReadOnlyListProxy(std::vector<T>&& data) : _data(std::move(data)) {}

    template<typename Iterable>
    ReadOnlyListProxy(const Iterable& data) : _data(data.begin(), data.end()) {}

    const T& operator[](std::ptrdiff_t index) const {
        if (index < 0) {
            index += static_cast<std::ptrdiff_t>(_data.size());
        }
        if (index < 0 || static_cast<size_t>(index) >= _data.size()) {
            throw std::out_of_range("index out of range");
        }
        return _data[static_cast<size_t>(index)];
    }

    std::vector<T> slice(size_t start, size_t stop, size_t step = 1) const {
        if (step == 0) {
            throw std::invalid_argument("slice step cannot be zero");
        }

        start = std::min(start, _data.size());
        stop = std::min(stop, _data.size());

        std::vector<T> result;
        for (size_t i = start; i < stop; i += step) {
            result.push_back(_data[i]);
        }
        return result;
    }

    size_t size() const {
        return _data.size();
    }

    bool contains(const T& item) const {
        return std::find(_data.begin(), _data.end(), item) != _data.end();
    }

    typename std::vector<T>::const_iterator begin() const {
        return _data.begin();
    }

    typename std::vector<T>::const_iterator end() const {
        return _data.end();
    }

    typename std::vector<T>::const_reverse_iterator rbegin() const {
        return _data.rbegin();
    }

    typename std::vector<T>::const_reverse_iterator rend() const {
        return _data.rend();
    }

    size_t index(const T& value, size_t start = 0, size_t stop = std::numeric_limits<size_t>::max()) const {
        if (stop == std::numeric_limits<size_t>::max()) {
            stop = _data.size();
        }
        start = std::min(start, _data.size());
        stop = std::min(stop, _data.size());
        auto it = std::find(_data.begin() + start, _data.begin() + stop, value);
        if (it == _data.begin() + stop) {
            throw std::runtime_error("Value not found");
        }
        return std::distance(_data.begin(), it);
    }

    size_t count(const T& value) const {
        return std::count(_data.begin(), _data.end(), value);
    }

    void erase(size_t index) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support item deletion");
    }

    void insert(size_t index, const T& value) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support insert()");
    }

    void push_back(const T& value) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support append()");
    }

    void clear() {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support clear()");
    }

    void reverse() {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support reverse()");
    }

    template<typename Iterable>
    void extend(const Iterable& other) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support extend()");
    }

    void extend(std::initializer_list<T> other) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support extend()");
    }

    T pop(size_t index = std::numeric_limits<size_t>::max()) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support pop()");
    }

    void remove(const T& value) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support remove()");
    }

    template<typename Iterable>
    void operator+=(const Iterable& other) {
        throw std::runtime_error("'ReadOnlyListProxy' object does not support in-place addition");
    }

    std::string repr() const {
        std::ostringstream oss;
        oss << "ReadOnlyListProxy([";
        for (size_t i = 0; i < _data.size(); ++i) {
            if (i != 0) {
                oss << ", ";
            }
            oss << _data[i];
        }
        oss << "])";
        return oss.str();
    }
};
