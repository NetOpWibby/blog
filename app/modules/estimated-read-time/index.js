"use strict";



//  P R O G R A M

function countSeconds(wordCount, options) {
  const WPM = getWPM(options);
  const seconds = (wordCount / WPM) * 60;

  return Math.ceil(seconds);
}

function countWords(content, { MIN_WORD_LEN = 4 }) {
  const arr = content.split(" ");
  let count = 0;

  for (let i = 0; i < arr.length; ++i)
    count += arr[i].length / MIN_WORD_LEN;

  return Math.round(count);
}

function getPreviousWPM({ TOTAL_WORDS = 0, TOTAL_SECONDS = 0, WPM = 265 }) {
  if (TOTAL_WORDS > 0 && TOTAL_SECONDS > 0)
    return ((TOTAL_WORDS * 60) / TOTAL_SECONDS);

  return WPM;
}

// Checks the Technical Difficulty and returns an appropriate WPM
function getTechnicalWPM({ IS_TECHNICAL_DOC = false, TECH_DIFFICULTY = 3, WPM = 265 }) {
  if (IS_TECHNICAL_DOC) {
    TECH_DIFFICULTY = (TECH_DIFFICULTY < 0) ? 0 : (TECH_DIFFICULTY > 5) ? 5 : TECH_DIFFICULTY;
    WPM -= (65 + (30 * TECH_DIFFICULTY));
    WPM = (WPM < 0) ? 50 : WPM;
  }

  return WPM;
}

function getWPM(options) {
  options.WPM = getPreviousWPM(options);
  return getTechnicalWPM(options);
}



//  E X P O R T

export default {
  getReadTime: (content, options) => {
    const wordCount = countWords(content, options);
    const seconds = countSeconds(wordCount, options);

    return { wordCount, seconds };
  },
  text: function(content, options) {
    options = !options ? {} : options;
    return this.getReadTime(content, options);
  }
};
