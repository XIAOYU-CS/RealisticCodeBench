
template<typename T>
class ReadOnlyListProxy {
public:
    ReadOnlyListProxy(const std::vector<T>& data);
    ReadOnlyListProxy(std::vector<T>&& data);

    template<typename Iterable>
    ReadOnlyListProxy(const Iterable& data);

    const T& operator[](std::ptrdiff_t index) const;
    std::vector<T> slice(size_t start, size_t stop, size_t step = 1) const;

    size_t size() const;
    bool contains(const T& item) const;

    typename std::vector<T>::const_iterator begin() const;
    typename std::vector<T>::const_iterator end() const;
    typename std::vector<T>::const_reverse_iterator rbegin() const;
    typename std::vector<T>::const_reverse_iterator rend() const;

    size_t index(const T& value, size_t start = 0, size_t stop = std::numeric_limits<size_t>::max()) const;
    size_t count(const T& value) const;

    void erase(size_t index);
    void insert(size_t index, const T& value);
    void push_back(const T& value);
    void clear();
    void reverse();

    template<typename Iterable>
    void extend(const Iterable& other);

    void extend(std::initializer_list<T> other);
    T pop(size_t index = std::numeric_limits<size_t>::max());
    void remove(const T& value);

    template<typename Iterable>
    void operator+=(const Iterable& other);

    std::string repr() const;
};
