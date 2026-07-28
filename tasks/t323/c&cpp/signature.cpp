#pragma once

#include <utility>
#include <vector>

using Σ = int;
const Σ Σ0 = 0;
using St = int;
using Dir = int;

struct Trans {
    St nxt;
    Dir dir;
    Σ out;

    Trans(St next, Dir direction, Σ output)
        : nxt(next), dir(direction), out(output) {}
};

struct ListES {
    std::vector<Σ> l;
    std::vector<Σ> r;
    Σ m;
    St s;

    ListES(std::vector<Σ> left, std::vector<Σ> right, Σ current, St state)
        : l(std::move(left)), r(std::move(right)), m(current), s(state) {}

    bool operator==(const ListES& other) const {
        return l == other.l && r == other.r && m == other.m && s == other.s;
    }
};
/**
 * @brief Execute a single step of the Turing machine, update configuration according to
 * transition rules and output logs.
 * 
 * @param tr Transition rule
 * @param x Current configuration
 * @return New configuration
 */
ListES ListES_step_prime(Trans tr, ListES x);
