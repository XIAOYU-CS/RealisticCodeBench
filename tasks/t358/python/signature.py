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