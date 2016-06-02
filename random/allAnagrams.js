/**
 * Given a single input string, write a function that produces all possible anagrams
 * of a string and outputs them as an array. At first, don't worry about
 * repeated strings.  What time complexity is your solution?
 *
 * Extra credit: Deduplicate your return array without using uniq().
 */

/**
  * example usage:
  * var anagrams = allAnagrams('abc');
  * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
  */

var allAnagrams = function(string) {
  // for strings, would use charAt because strings aren't accessible like arrays in IE (prior to IE9).
  // use arrays for functional programming style

  // create a storage for words

  // create a function that can be called recursively with comboSoFar, lettersLeft as inputs

    // loop through each letter in the world so it can be the starting letter

      // take letter out of lettersLeft and put it into comboSoFar

      // when there are no more lettersLeft, add comboSoFar to the store

  // launch the recursive function with an empty array and string.split('')

  // return keys in storage
};

 var anagrams = allAnagrams('abc');
 console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]