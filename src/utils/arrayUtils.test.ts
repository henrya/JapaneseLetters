import { shuffleArray } from './arrayUtils';

describe('shuffleArray', () => {
  it('should return an array with the same length', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);
    expect(shuffled).toHaveLength(array.length);
  });

  it('should return an array with the same elements', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);
    expect(shuffled).toEqual(expect.arrayContaining(array));
    expect(array).toEqual(expect.arrayContaining(shuffled));
  });

  it('should not return the same array instance', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);
    expect(shuffled).not.toBe(array);
  });

  it('should produce a predictable shuffle when Math.random is mocked', () => {
    const array = [1, 2, 3, 4, 5];
    const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    
    const shuffled = shuffleArray(array);
    // Based on the Fisher-Yates algorithm and a constant 0.5 random value,
    // the shuffle will be deterministic.
    // Let's trace it:
    // i=4, j=floor(0.5*5)=2 -> swap(4,2) -> [1,2,5,4,3]
    // i=3, j=floor(0.5*4)=2 -> swap(3,2) -> [1,2,4,5,3]
    // i=2, j=floor(0.5*3)=1 -> swap(2,1) -> [1,4,2,5,3]
    // i=1, j=floor(0.5*2)=1 -> swap(1,1) -> [1,4,2,5,3]
    expect(shuffled).toEqual([1, 4, 2, 5, 3]);

    mockRandom.mockRestore();
  });
});
