const palindrome = require('../utils/for_testing').palindrome;

test('palindrome of a', () => {
    const result = palindrome('a');
    expect(result).toBe('a');
});

test('palindrome of react', () => {
    const result = palindrome('react');
    expect(result).toBe('tcker');
});

test('palindrome of revelever', () => {
    const result = palindrome('revelever');
    expect(result).toBe('revelever');
});