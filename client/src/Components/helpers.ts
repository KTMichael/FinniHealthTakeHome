export const getDisplayedRowsRange = (
  currentPageNum,
  pageSize,
  totalRowCount
) => {
  const last: number = currentPageNum * pageSize;

  const start: number = last - (pageSize - 1);

  let end = last;

  if (start === totalRowCount) {
    end = start;
  } else if (totalRowCount < pageSize) {
    end = totalRowCount;
  }

  return { start: start, end: end };
};

export const formatPhoneNumber = (number) => {
  const cleaned = ("" + number).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

export const deepCompare = (originalVal, updatedVal) => {
  if (originalVal === updatedVal) return {};
  const diffs = {};
  for (const key in originalVal) {
    if (originalVal[key] !== updatedVal[key]) {
      diffs[key] = updatedVal[key];
    }
  }
  return diffs;
};

export const upperCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};
