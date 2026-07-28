describe('TestCalculateBearing', () => {
    it('should calculate north bearing correctly', () => {
      expect(calculateBearing(0, 0, 10, 0)).toBeCloseTo(0);
    });
  
    it('should calculate east bearing correctly', () => {
      expect(calculateBearing(0, 0, 0, 10)).toBeCloseTo(90);
    });
  
    it('should calculate south bearing correctly', () => {
      expect(calculateBearing(10, 0, 0, 0)).toBeCloseTo(180);
    });
  
    it('should calculate west bearing correctly', () => {
      expect(calculateBearing(0, 10, 0, 0)).toBeCloseTo(270);
    });
  
    it('should calculate bearing across prime meridian correctly', () => {
      expect(calculateBearing(0, -1, 0, 1)).toBeCloseTo(90);
    });
  });