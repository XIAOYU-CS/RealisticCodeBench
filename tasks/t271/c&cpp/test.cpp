TEST_CASE("stack_t Test Cases", "[stack_t]") {
    SECTION("pushes and pops a single element") {
        stack_t stack;
        stack.push(3.14f);
        REQUIRE(stack.pop() == Approx(3.14f));
        REQUIRE(stack.isEmpty());
    }

    SECTION("uses LIFO order and peek does not remove") {
        stack_t stack;
        stack.push(1.23f);
        stack.push(4.56f);
        REQUIRE(stack.peek() == Approx(4.56f));
        REQUIRE(stack.pop() == Approx(4.56f));
        REQUIRE(stack.pop() == Approx(1.23f));
        REQUIRE(stack.isEmpty());
    }

    SECTION("pop from an empty stack throws") {
        stack_t stack;
        REQUIRE_THROWS_AS(stack.pop(), std::underflow_error);
    }

    SECTION("peek on an empty stack throws") {
        stack_t stack;
        REQUIRE_THROWS_AS(stack.peek(), std::underflow_error);
    }

    SECTION("pushing past fixed capacity throws") {
        stack_t stack;
        for (int i = 0; i < 100; ++i) {
            stack.push(static_cast<float>(i) + 0.5f);
        }
        REQUIRE_THROWS_AS(stack.push(100.5f), std::overflow_error);
    }
}
