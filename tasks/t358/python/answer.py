from typing import List, Dict, Any
import math


def calculate_mortgage_details(principal: float, annual_rate: float, years: int) -> Dict[str, Any]:
    """Calculate mortgage details including monthly payment, total interest, total cost, and amortization schedule

    Args:
        principal (float): Loan principal amount
        annual_rate (float): Annual interest rate (in percentage, e.g., 5.5 for 5.5%)
        years (int): Loan term in years

    Returns:
        dict: Object containing mortgage details:
            - monthlyPayment (float): Monthly payment amount
            - totalInterest (float): Total interest paid over the loan term
            - totalCost (float): Total cost (principal + interest)
            - amortizationSchedule (list[dict]): Amortization schedule table, each containing:
                - month (int): Month number
                - totalPayment (float): Total payment for the month
                - principalPayment (float): Principal payment for the month
                - interestPayment (float): Interest payment for the month
                - remainingPrincipal (float): Remaining principal balance
    """

    monthly_rate = annual_rate / 100 / 12
    total_payments = years * 12

    if annual_rate == 0:
        monthly_payment = principal / total_payments
    else:
        monthly_payment = (principal * monthly_rate * math.pow(1 + monthly_rate, total_payments)) / \
                          (math.pow(1 + monthly_rate, total_payments) - 1)

    remaining_principal = principal
    amortization_schedule = []

    for month in range(1, total_payments + 1):
        if annual_rate == 0:
            interest_payment = 0
            principal_payment = monthly_payment
        else:
            interest_payment = remaining_principal * monthly_rate
            principal_payment = monthly_payment - interest_payment

        remaining_principal -= principal_payment
        remaining_principal = max(0, remaining_principal)

        amortization_schedule.append({
            'month': month,
            'totalPayment': monthly_payment,
            'principalPayment': principal_payment,
            'interestPayment': interest_payment,
            'remainingPrincipal': remaining_principal
        })

    return {
        'monthlyPayment': monthly_payment,
        'totalInterest': (monthly_payment * total_payments) - principal,
        'totalCost': monthly_payment * total_payments,
        'amortizationSchedule': amortization_schedule
    }