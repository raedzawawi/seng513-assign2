// Name: Raed Zawawi
// Student ID: 10080856
// SENG 513 Assignment 2
// this is just a stub for a function you need to implement
//
function getStats(txt) {
    return {
        nChars: getCharacterNumber(txt),
        nWords: getWordNumber(txt),
        nLines: getLineNumber(txt),
        nNonEmptyLines: getNonEmptyLineNumber(txt),
        averageWordLength: getAverageWordLength(txt),
        maxLineLength: getMaxLineLength(txt),
        palindromes: getPalindromes(txt),
        longestWords: getLongestWords(txt),
        mostFrequentWords: getFrequentWords(txt)
    };
}

function getWordArray(str) {
    return str.toLowerCase().replace(/[\W_]/g, " ").trim().split(/\s+/);
}

// Part 1: Get the number of Characters
function getCharacterNumber(str) {
    return str.length;
}

// Part 2: Get the number of words
function getWordNumber(str) {
    var wordArr  = getWordArray(str);
    if (isEmpty(wordArr)) {
        return 0;
    }
    return wordArr.length;
}

// Part 3: Get the number of lines
function getLineNumber(str) {
    var wordArr  = getWordArray(str);
    if (isEmpty(wordArr)) {
        return 0;
    }
    return str.split(/\r\n|\r|\n/).length;
}

// Part 4: Get the number of Non-empty lines
function getNonEmptyLineNumber(str) {
    return (str.match(/^\s*\S/gm) || "").length;
}

// Part 5: Get the average word length
function getAverageWordLength(str) {
    var wordArr = getWordArray(str);
    var totalLen = 0;
    for (i=0;i<wordArr.length;i++) {
       totalLen += wordArr[i].length;
    }
    return (totalLen/wordArr.length);
}

// Part 6: Get the maximum line length
function getMaxLineLength(str) {
    var lines = str.split("\n");
    var max = 0;
    for (i=0;i<lines.length;i++) {
        if (lines[i].length > max) {
            max = lines[i].length;
        }
    }
    return max;
}

// Part 7: Get a list of palindromes
function getPalindromes(str) {
    var wordArr = getWordArray(str);
    let paliArr = [];
    for (i=0;i<wordArr.length;i++) {
        if (isPalindrome(wordArr[i]) && wordArr[i].length > 2) {
            paliArr.push(wordArr[i]);
        }
    }
    return paliArr;
}

function isPalindrome(str) {
    return (str == str.split('').reverse().join(''));
}

function getUniqueArray(arr) {
    return arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
}

// Part 8: Get a list of longest words
function getLongestWords(str) {
    var wordArr = getWordArray(str);
    console.log(wordArr);
    if (wordArr.length === 1 && wordArr[0] === "") {
        return [];
    } else {
        return wordArr = getSortedArray(getUniqueArray(wordArr)).slice(0,10);
    }
}

function getSortedArray(ar) {
    return ar.sort(function(a,b) {
        return b.length - a.length || a.localeCompare(b);
    });
}

function isEmpty(arr) {
    return arr.length === 1 && arr[0] === "";
}

function getTenPairs(darr) {
    return darr.sort(
        function(a,b) {
            return b.count - a.count || a.word.localeCompare(b.word);
        }).slice(0,10);
}

// Part 9: Get a list of most frequent words
function getFrequentWords(str) {
    var wordArr = getWordArray(str).sort();
    var words = [];
    var pairs = [];

    if (isEmpty(wordArr)) {
        return [];
    } else {
        var freq = 0;
        var check = wordArr[0];
        for (i=0;i<wordArr.length;i++) {
            if (wordArr[i] === check) {
                freq++;
            } else {
                pairs.push({word: check, count: freq})
                check = wordArr[i];
                freq = 1;
            }
        }
        pairs.push({word: check, count: freq}); 

        var tenPairs = getTenPairs(pairs);
        var finalArray = [];
        for (i = 0; i < tenPairs.length; i++) {
            finalArray.push(tenPairs[i].word + '(' + tenPairs[i].count + ')');
        }

        return finalArray;

    }
}