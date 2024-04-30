import { greet, Sample } from '../index.js';

describe('greet function', () => {
  it('should return the correct greeting', () => {
    const sample: Sample = { name: 'John' };
    const result = greet(sample);
    expect(result).toContain('Hello from');
  });
});