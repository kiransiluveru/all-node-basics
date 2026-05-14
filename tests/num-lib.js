const absoluteNum = (num) => {
  if (num > 0) {
    return num;
  }
  if (num < 0) {
    return -num;
  }
  return num;
};

export { absoluteNum };
