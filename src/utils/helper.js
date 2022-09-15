const extractVideoUrl = (obj) => {
  if (!obj) return null;
  if (obj.reddit_video) {
    return obj.reddit_video.fallback_url;
  } else return null;
};

const shuffleArray = (arr = []) => {
  let length = arr.length;
  if (!length) return null;
  let i;
  while (length) {
    i = Math.floor(Math.random() * length--);
    [arr[length], arr[i]] = [arr[i], arr[length]];
  }
  return arr;
};

module.exports = {
  extractVideoUrl,
  shuffleArray,
};
