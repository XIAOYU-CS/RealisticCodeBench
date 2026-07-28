#define stack_t t271_stack_t

class stack_t {
public:
    stack_t();
    void push(float value);
    float pop();
    float peek() const;
    bool isEmpty() const;
};
