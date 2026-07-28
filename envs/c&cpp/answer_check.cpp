#define CATCH_CONFIG_MAIN
#include "lib/catch.hpp"

#ifndef ANSWER_CPP
#error "Define ANSWER_CPP as a quoted path to answer.cpp"
#endif

#ifndef TEST_CPP
#error "Define TEST_CPP as a quoted path to test.cpp"
#endif

#include ANSWER_CPP
#include TEST_CPP
