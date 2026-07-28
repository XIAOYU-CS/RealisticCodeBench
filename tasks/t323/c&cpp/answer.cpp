#include "signature.cpp"

static std::vector<Σ> prepend(Σ value, const std::vector<Σ>& tail) {
    std::vector<Σ> result;
    result.reserve(tail.size() + 1);
    result.push_back(value);
    result.insert(result.end(), tail.begin(), tail.end());
    return result;
}

ListES ListES_step_prime(Trans tr, ListES x) {
    auto l0 = x.l;
    auto r0 = x.r;
    auto s1 = tr.nxt;
    auto d = tr.dir;
    auto o = tr.out;

    if (d > 0) {
        if (!r0.empty()) {
            auto m1 = r0[0];
            std::vector<Σ> r1(r0.begin() + 1, r0.end());
            return ListES(prepend(o, l0), r1, m1, s1);
        }
        return ListES(prepend(o, l0), {}, Σ0, s1);
    } else if (d < 0) {
        if (!l0.empty()) {
            auto m1 = l0[0];
            std::vector<Σ> l1(l0.begin() + 1, l0.end());
            return ListES(l1, prepend(o, r0), m1, s1);
        }
        return ListES({}, prepend(o, r0), Σ0, s1);
    } else {
        return ListES(l0, r0, o, s1);
    }
}
