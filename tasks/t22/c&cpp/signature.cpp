#ifndef T22_SIGNATURE_CPP
#define T22_SIGNATURE_CPP

#include <vector>

class QuadratureRule {
public:
    std::vector<double> x;
    std::vector<double> w;
};

class OrthogonalPolynomial {
public:
    std::vector<double> alpha;
    std::vector<double> beta;
    std::vector<double> gamma;
    QuadratureRule quadrature_rule;
};

OrthogonalPolynomial lanczos(int n, const QuadratureRule& quadrature_rule);

#endif
