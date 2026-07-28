#include "signature.cpp"

#include <numeric>
#include <stdexcept>

namespace {

double dotProduct(const std::vector<double>& v1, const std::vector<double>& v2) {
    return std::inner_product(v1.begin(), v1.end(), v2.begin(), 0.0);
}

std::vector<double> multiply(const std::vector<double>& v1, const std::vector<double>& v2) {
    std::vector<double> result(v1.size());
    for (size_t i = 0; i < v1.size(); ++i) {
        result[i] = v1[i] * v2[i];
    }
    return result;
}

std::vector<double> multiplyScalar(const std::vector<double>& v, double scalar) {
    std::vector<double> result(v.size());
    for (size_t i = 0; i < v.size(); ++i) {
        result[i] = v[i] * scalar;
    }
    return result;
}

std::vector<double> subtract(const std::vector<double>& v1, const std::vector<double>& v2) {
    std::vector<double> result(v1.size());
    for (size_t i = 0; i < v1.size(); ++i) {
        result[i] = v1[i] - v2[i];
    }
    return result;
}

std::vector<double> subtractScalar(const std::vector<double>& v, double scalar) {
    std::vector<double> result(v.size());
    for (size_t i = 0; i < v.size(); ++i) {
        result[i] = v[i] - scalar;
    }
    return result;
}

}

OrthogonalPolynomial lanczos(int n, const QuadratureRule& quadrature_rule) {
    if (n <= 0 || n > static_cast<int>(quadrature_rule.x.size()) ||
        quadrature_rule.x.size() != quadrature_rule.w.size()) {
        throw std::invalid_argument("n must be between 1 and len(x), and x/w sizes must match.");
    }

    const std::vector<double>& x = quadrature_rule.x;
    const std::vector<double>& w = quadrature_rule.w;
    std::vector<double> alpha(n);
    std::vector<double> beta(n - 1, 0.0);
    std::vector<double> gamma(n);

    std::vector<double> p0(x.size(), 1.0);
    std::vector<double> p1(x.size(), 0.0);

    for (int i = 0; i < n; ++i) {
        std::vector<double> pi;
        if (i > 1) {
            pi = subtract(multiply(subtractScalar(x, alpha[i - 1]), p0), multiplyScalar(p1, beta[i - 1]));
        } else if (i > 0) {
            pi = multiply(subtractScalar(x, alpha[i - 1]), p0);
        } else {
            pi = p0;
        }

        gamma[i] = dotProduct(multiply(w, pi), pi);
        alpha[i] = dotProduct(multiply(multiply(w, x), pi), pi) / gamma[i];

        if (i < n - 1) {
            beta[i] = dotProduct(multiply(multiply(w, pi), pi), pi) / gamma[i];
            p1 = p0;
            p0 = pi;
        }
    }

    return {alpha, beta, gamma, quadrature_rule};
}
