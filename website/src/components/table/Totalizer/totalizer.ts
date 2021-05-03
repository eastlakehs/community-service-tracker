import { initialStateType } from "../../../redux/userDataSlice";
const totalizeHours = (data: initialStateType) => {
  let hoursTotal = 0;
  Object.keys(data.data).forEach((entry) => {
    hoursTotal += Number(data.data[entry].Hours);
  });
  const returnNumber = hoursTotal.toFixed(1);
  // Pretty print decimals ending with zero
  if (returnNumber.endsWith("0")) {
    return hoursTotal.toFixed(0);
  }
  // otherwise return first decimal point
  return returnNumber;
};
export { totalizeHours };
