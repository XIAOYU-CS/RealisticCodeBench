describe('calculateMortgageDetails', () => {
  test('should calculate correct mortgage details for standard case', () => {
    const result = calculateMortgageDetails(100000, 5, 30);
    expect(result.monthlyPayment).toBeCloseTo(536.82, 2);
    expect(result.totalInterest).toBeCloseTo(93255.78, 2);
    expect(result.totalCost).toBeCloseTo(193255.78, 2);
    expect(result.amortizationSchedule).toHaveLength(360);
  });

  test('should calculate correct mortgage details for 15-year loan', () => {
    const result = calculateMortgageDetails(200000, 4.5, 15);
    expect(result.monthlyPayment).toBeCloseTo(1529.99, 2);
    expect(result.totalInterest).toBeCloseTo(75397.58, 2);
    expect(result.totalCost).toBeCloseTo(275397.58, 2);
    expect(result.amortizationSchedule).toHaveLength(180);
  });

  test('should calculate correct mortgage details for zero interest rate', () => {
    const result = calculateMortgageDetails(120000, 0, 10);
    expect(result.monthlyPayment).toBeCloseTo(1000, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
    expect(result.totalCost).toBeCloseTo(120000, 2);
    expect(result.amortizationSchedule).toHaveLength(120);
  });

  test('should handle small loan amount correctly', () => {
    const result = calculateMortgageDetails(1000, 10, 1);
    expect(result.monthlyPayment).toBeCloseTo(87.92, 2);
    expect(result.totalInterest).toBeCloseTo(54.99, 2);
    expect(result.totalCost).toBeCloseTo(1054.99, 2);
    expect(result.amortizationSchedule).toHaveLength(12);
  });

  test('should validate amortization schedule structure', () => {
    const result = calculateMortgageDetails(50000, 6, 5);
    expect(result.amortizationSchedule).toHaveLength(60);
    const firstMonth = result.amortizationSchedule[0];
    expect(firstMonth).toHaveProperty('month', 1);
    expect(firstMonth).toHaveProperty('totalPayment');
    expect(firstMonth).toHaveProperty('principalPayment');
    expect(firstMonth).toHaveProperty('interestPayment');
    expect(firstMonth).toHaveProperty('remainingPrincipal');
    const lastMonth = result.amortizationSchedule[59];
    expect(lastMonth.month).toBe(60);
    expect(lastMonth.remainingPrincipal).toBeCloseTo(0, 10);
  });

  test('should have decreasing remaining principal over time', () => {
    const result = calculateMortgageDetails(100000, 5, 10);
    const schedule = result.amortizationSchedule;
    for (let i = 0; i < schedule.length - 1; i++) {
      expect(schedule[i].remainingPrincipal).toBeGreaterThanOrEqual(schedule[i + 1].remainingPrincipal);
    }
    expect(schedule[0].remainingPrincipal).toBeGreaterThan(schedule[schedule.length - 1].remainingPrincipal);
  });

  test('should have increasing principal payments over time', () => {
    const result = calculateMortgageDetails(100000, 5, 10);
    const schedule = result.amortizationSchedule;
    const earlyMonths = schedule.slice(0, 10);
    for (let i = 0; i < earlyMonths.length - 1; i++) {
      expect(earlyMonths[i].principalPayment).toBeLessThanOrEqual(earlyMonths[i + 1].principalPayment);
    }
  });

  test('should have decreasing interest payments over time', () => {
    const result = calculateMortgageDetails(100000, 5, 10);
    const schedule = result.amortizationSchedule;
    const earlyMonths = schedule.slice(0, 10);
    for (let i = 0; i < earlyMonths.length - 1; i++) {
      expect(earlyMonths[i].interestPayment).toBeGreaterThanOrEqual(earlyMonths[i + 1].interestPayment);
    }
  });

  test('should maintain consistent monthly payment throughout schedule', () => {
    const result = calculateMortgageDetails(75000, 4.25, 20);
    const schedule = result.amortizationSchedule;
    const firstPayment = schedule[0].totalPayment;
    for (let i = 0; i < Math.min(12, schedule.length); i++) {
      expect(schedule[i].totalPayment).toBeCloseTo(firstPayment, 2);
    }
  });

  test('should handle edge case with very short term', () => {
    const result = calculateMortgageDetails(10000, 8, 0.5);

    expect(result.amortizationSchedule).toHaveLength(6);
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalInterest).toBeGreaterThan(0);
  });


  test('should calculate correct total interest as difference between total cost and principal', () => {
    const principal = 80000;
    const annualRate = 6.5;
    const years = 15;

    const result = calculateMortgageDetails(principal, annualRate, years);

    expect(result.totalInterest).toBeCloseTo(result.totalCost - principal, 2);
  });

  test('should prevent negative remaining principal due to floating point errors', () => {
    const result = calculateMortgageDetails(100000, 5, 30);
    const hasNegativePrincipal = result.amortizationSchedule.some(
      month => month.remainingPrincipal < 0
    );

    expect(hasNegativePrincipal).toBe(false);
  });
});