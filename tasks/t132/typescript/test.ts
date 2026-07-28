describe('TestReadTsvFromStdin', () => {
    it('test basic TSV input', async () => {
	      const mockStdin = 'col1\tcol2\tcol3\nval1\tval2\tval3\n';
	      process.stdin.setEncoding('utf8');
	      process.stdin.emit('data', mockStdin);
  
      const expectedOutput = [['col1', 'col2', 'col3'], ['val1', 'val2', 'val3']];
      const result = await readTsvFromStdin();
  
      expect(result).toEqual(expectedOutput);
    });
  
    it('test single column', async () => {
		      const mockStdin = 'col1\nval1\nval2\n';
		      process.stdin.setEncoding('utf8');
		      process.stdin.emit('data', mockStdin);
	  
      const expectedOutput = [['col1'], ['val1'], ['val2']];
      const result = await readTsvFromStdin();
	  
      expect(result).toEqual(expectedOutput);
    });

    it('test all rows empty', async () => {
		      const mockStdin = 'col1\tcol2\tcol3\n\n\n';
		      process.stdin.setEncoding('utf8');
		      process.stdin.emit('data', mockStdin);

      const expectedOutput = [['col1', 'col2', 'col3'], ['', '', ''], ['', '', '']];
      const result = await readTsvFromStdin();

      expect(result).toEqual(expectedOutput);
    });

    it('test multiple consecutive tabs', async () => {
		      const mockStdin = 'col1\t\tcol2\tcol3\nval1\t\tval2\tval3\n';
		      process.stdin.setEncoding('utf8');
		      process.stdin.emit('data', mockStdin);

      const expectedOutput = [['col1', '', 'col2', 'col3'], ['val1', '', 'val2', 'val3']];
      const result = await readTsvFromStdin();

      expect(result).toEqual(expectedOutput);
    });

    it('test missing columns', async () => {
		      const mockStdin = 'col1\tcol2\tcol3\nval1\tval2\nval1.1\tval2.1\tval3.1\n';
		      process.stdin.setEncoding('utf8');
		      process.stdin.emit('data', mockStdin);

      const expectedOutput = [['col1', 'col2', 'col3'], ['val1', 'val2', ''], ['val1.1', 'val2.1', 'val3.1']];
      const result = await readTsvFromStdin();

      expect(result).toEqual(expectedOutput);
    });
	  });
