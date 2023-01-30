export const UseDifferentValueCheck = (value1: any, value2: any) => {
  const val1 = JSON.stringify(value1);
  const Val2 = JSON.stringify(value2);
  if (val1 === Val2) {
    return false;
  } else {
    return true;
  }
};
