import unittest


class TestCalculateMortgageDetails(unittest.TestCase):

    def test_should_calculate_correct_mortgage_details_for_standard_case(self):
        result = calculate_mortgage_details(100000, 5, 30)

        self.assertAlmostEqual(result['monthlyPayment'], 536.82, places=2)
        self.assertAlmostEqual(result['totalInterest'], 93255.78, places=2)
        self.assertAlmostEqual(result['totalCost'], 193255.78, places=2)
        self.assertEqual(len(result['amortizationSchedule']), 360)

    def test_should_calculate_correct_mortgage_details_for_15_year_loan(self):
        result = calculate_mortgage_details(200000, 4.5, 15)

        self.assertAlmostEqual(result['monthlyPayment'], 1529.99, places=2)
        self.assertAlmostEqual(result['totalInterest'], 75397.58, places=2)
        self.assertAlmostEqual(result['totalCost'], 275397.58, places=2)
        self.assertEqual(len(result['amortizationSchedule']), 180)

    def test_should_calculate_correct_mortgage_details_for_zero_interest_rate(self):
        result = calculate_mortgage_details(120000, 0, 10)

        self.assertAlmostEqual(result['monthlyPayment'], 1000, places=2)
        self.assertAlmostEqual(result['totalInterest'], 0, places=2)
        self.assertAlmostEqual(result['totalCost'], 120000, places=2)
        self.assertEqual(len(result['amortizationSchedule']), 120)

    def test_should_handle_small_loan_amount_correctly(self):
        result = calculate_mortgage_details(1000, 10, 1)

        self.assertAlmostEqual(result['monthlyPayment'], 87.92, places=2)
        self.assertAlmostEqual(result['totalInterest'], 54.99, places=2)
        self.assertAlmostEqual(result['totalCost'], 1054.99, places=2)
        self.assertEqual(len(result['amortizationSchedule']), 12)

    def test_should_validate_amortization_schedule_structure(self):
        result = calculate_mortgage_details(50000, 6, 5)

        self.assertEqual(len(result['amortizationSchedule']), 60)
        first_month = result['amortizationSchedule'][0]
        self.assertEqual(first_month['month'], 1)
        self.assertIn('totalPayment', first_month)
        self.assertIn('principalPayment', first_month)
        self.assertIn('interestPayment', first_month)
        self.assertIn('remainingPrincipal', first_month)

        last_month = result['amortizationSchedule'][59]
        self.assertEqual(last_month['month'], 60)
        self.assertAlmostEqual(last_month['remainingPrincipal'], 0, places=10)

    def test_should_have_decreasing_remaining_principal_over_time(self):
        result = calculate_mortgage_details(100000, 5, 10)
        schedule = result['amortizationSchedule']

        for i in range(len(schedule) - 1):
            self.assertGreaterEqual(schedule[i]['remainingPrincipal'], schedule[i + 1]['remainingPrincipal'])

        self.assertGreater(schedule[0]['remainingPrincipal'], schedule[-1]['remainingPrincipal'])

    def test_should_have_increasing_principal_payments_over_time(self):
        result = calculate_mortgage_details(100000, 5, 10)
        schedule = result['amortizationSchedule']
        early_months = schedule[:10]
        for i in range(len(early_months) - 1):
            self.assertLessEqual(early_months[i]['principalPayment'], early_months[i + 1]['principalPayment'])

    def test_should_have_decreasing_interest_payments_over_time(self):
        result = calculate_mortgage_details(100000, 5, 10)
        schedule = result['amortizationSchedule']
        early_months = schedule[:10]
        for i in range(len(early_months) - 1):
            self.assertGreaterEqual(early_months[i]['interestPayment'], early_months[i + 1]['interestPayment'])

    def test_should_maintain_consistent_monthly_payment_throughout_schedule(self):
        result = calculate_mortgage_details(75000, 4.25, 20)
        schedule = result['amortizationSchedule']
        first_payment = schedule[0]['totalPayment']
        for i in range(min(12, len(schedule))):
            self.assertAlmostEqual(schedule[i]['totalPayment'], first_payment, places=2)

    def test_should_calculate_correct_total_interest_as_difference_between_total_cost_and_principal(self):
        principal = 80000
        annual_rate = 6.5
        years = 15
        result = calculate_mortgage_details(principal, annual_rate, years)
        self.assertAlmostEqual(result['totalInterest'], result['totalCost'] - principal, places=2)

    def test_should_prevent_negative_remaining_principal_due_to_floating_point_errors(self):
        result = calculate_mortgage_details(100000, 5, 30)
        has_negative_principal = any(
            month['remainingPrincipal'] < 0 for month in result['amortizationSchedule']
        )
        self.assertFalse(has_negative_principal)
