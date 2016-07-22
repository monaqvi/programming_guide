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
  // create a storage for words
  var anagrams = {};

  // create a function that can be called recursively with comboSoFar, lettersLeft as inputs
  var anagramMaker = function(comboSoFar, lettersLeft) {
    // when there are no more lettersLeft, add comboSoFar to the store
    if (lettersLeft === '') anagrams[comboSoFar] = true;
    // loop through each letter in the world so it can be the starting letter
    lettersLeft.split('').forEach(function(letter, i) {
      // take letter out of lettersLeft and put it into comboSoFar
      anagramMaker(comboSoFar.concat(letter), lettersLeft.slice(0, i).concat(lettersLeft.slice(i + 1)));
    });
  }

  // launch the recursive function with an empty array and string.split('')
  anagramMaker('', string);
  // return keys in storage
  return Object.keys(anagrams);
};

 var anagrams = allAnagrams('abc');
 console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]