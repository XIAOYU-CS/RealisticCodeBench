#include <iostream>
#include <vector>
#include <string>

class Queue {
private:
    std::vector<int> items; // Change type as needed

public:
    void enqueue(int element) {
        items.push_back(element);
    }

    std::string dequeue() {
        if (isEmpty()) {
            return "Underflow";
        }
        int frontElement = items.front();
        items.erase(items.begin());
        return std::to_string(frontElement);
    }

    std::string front() {
        if (isEmpty()) {
            return "No elements in Queue";
        }
        return std::to_string(items.front());
    }

    bool isEmpty() {
        return items.empty();
    }

    std::string printQueue() {
        std::string result;
        for (size_t i = 0; i < items.size(); ++i) {
            if (i > 0) {
                result += " ";
            }
            result += std::to_string(items[i]);
        }
        return result;
    }
};
