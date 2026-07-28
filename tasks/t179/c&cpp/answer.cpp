#include <cmath>

double compute_remaining_loan_payment(double principal, double interestRate, int numberOfPayments) {
    if (numberOfPayments <= 0) {
        return principal;
    }
    if (interestRate == 0) {
        return 0;
    }
    double monthlyPayment = principal * (interestRate * pow(1 + interestRate, numberOfPayments)) / (pow(1 + interestRate, numberOfPayments) - 1);
    double balance = principal;
    for (int i = 0; i < numberOfPayments; i++) {
        balance = balance * (1 + interestRate) - monthlyPayment;
    }
    return balance;
}
