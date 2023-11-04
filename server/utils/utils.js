function extractYear(date) {
  return date.release_date.substring(0, 4);
}

module.exports = {
  extractYear
};