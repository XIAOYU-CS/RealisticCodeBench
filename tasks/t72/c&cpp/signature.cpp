#include <string>

class json;

class BitSequenceEncoder {
public:
    std::string encode(json obj) const;
};
