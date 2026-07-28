
#include <vector>
#include <cmath>
#include <map>
#include <string>
#include <any>

using namespace std;

map<string, any> calculate_mortgage_details(float principal, float annual_rate, int years) {
    double monthly_rate = annual_rate / 100 / 12;
    int total_payments = years * 12;
    double monthly_payment;

    if (annual_rate == 0) {
        monthly_payment = principal / total_payments;
    } else {
        monthly_payment = (principal * monthly_rate * pow(1 + monthly_rate, total_payments)) / 
                          (pow(1 + monthly_rate, total_payments) - 1);
    }

    double remaining_principal = principal;
    vector<map<string, any>> amortization_schedule;

    for (int month = 1; month <= total_payments; ++month) {
        double interest_payment;
        double principal_payment;

        if (annual_rate == 0) {
            interest_payment = 0;
            principal_payment = monthly_payment;
        } else {
            interest_payment = remaining_principal * monthly_rate;
            principal_payment = monthly_payment - interest_payment;
        }

        remaining_principal -= principal_payment;
        remaining_principal = max(0.0, remaining_principal);

        map<string, any> schedule_entry;
        schedule_entry["month"] = month;
        schedule_entry["totalPayment"] = monthly_payment;
        schedule_entry["principalPayment"] = principal_payment;
        schedule_entry["interestPayment"] = interest_payment;
        schedule_entry["remainingPrincipal"] = remaining_principal;

        amortization_schedule.push_back(schedule_entry);
    }

    map<string, any> result;
    result["monthlyPayment"] = monthly_payment;
    result["totalInterest"] = (monthly_payment * total_payments) - principal;
    result["totalCost"] = monthly_payment * total_payments;
    result["amortizationSchedule"] = amortization_schedule;

    return result;
}
