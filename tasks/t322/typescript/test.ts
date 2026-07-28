const mockGdb = {
  GdbError: jest.fn(),
  parse_and_eval: jest.fn(),
  execute: jest.fn()
};

const originalGdb = (global as any).gdb;

beforeAll(() => {
  (global as any).gdb = mockGdb;
  mockGdb.GdbError.mockImplementation((message: string) => new Error(message));
});

afterAll(() => {
  (global as any).gdb = originalGdb;
});

beforeEach(() => {
  mockGdb.parse_and_eval.mockReset();
  mockGdb.execute.mockReset();
  mockGdb.GdbError.mockClear();
  console.log = jest.fn();
});

describe('GdbBatchBreakpoint.invoke', () => {
  let batchBreakpoint: GdbBatchBreakpoint;

  beforeEach(() => {
    batchBreakpoint = new GdbBatchBreakpoint();
  });


  test('should throw GdbError when no arguments provided', () => {
    expect(() => {
      batchBreakpoint.invoke('', false);
    }).toThrow('Invalid arguments: Requires start_address [count] [step]');
  });

  test('should throw GdbError for unsupported step size', () => {
    expect(() => {
      batchBreakpoint.invoke('0x3000 5 6', false);
    }).toThrow('Unsupported step size 6. Use 4 (32-bit) or 8 (64-bit)');
  });

  test('should create a 64-bit breakpoint successfully', () => {
    mockGdb.parse_and_eval.mockReturnValue(BigInt(0x1000));
    mockGdb.execute
      .mockReturnValueOnce('0x1000: 0x2000')
      .mockReturnValueOnce('Breakpoint 1 at 0x2000');

    const result = batchBreakpoint.invoke('0x1000 1 8', false);

    expect(result.success).toEqual([['0x2000', 1]]);
    expect(result.failed).toHaveLength(0);
    expect(mockGdb.execute).toHaveBeenNthCalledWith(1, 'x/gx 0x1000', true);
    expect(mockGdb.execute).toHaveBeenNthCalledWith(2, 'break *0x2000', true);
  });


  test('should handle breakpoint setting failure', () => {
    mockGdb.parse_and_eval.mockReturnValue(BigInt(0x4000));

    mockGdb.execute
      .mockReturnValueOnce('0x4000: 0x5000')
      .mockReturnValueOnce('Error setting breakpoint');

    const result = batchBreakpoint.invoke('0x4000 1 8', true);

    expect(result.success).toHaveLength(0);
    expect(result.failed).toHaveLength(1);
    expect(result.failed[0][0]).toBe('0x4000');
    expect(result.failed[0][1]).toContain('Breakpoint command failed');
  });
  test('should handle invalid memory output format', () => {
    mockGdb.parse_and_eval.mockReturnValue(BigInt(0x5000));

    mockGdb.execute
      .mockReturnValueOnce('Invalid format without colon');

    const result = batchBreakpoint.invoke('0x5000 1 8', true);

    expect(result.success).toHaveLength(0);
    expect(result.failed).toHaveLength(1);
    expect(result.failed[0][0]).toBe('0x5000');
    expect(result.failed[0][1]).toContain('Unexpected memory output format');
  });


});
