export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator.language
) =>
  first === undefined ? "" : first.toLocaleUpperCase(locale) + rest.join("");

export const nullCheck = (str) => {
  if (
    typeof str == "undefined" ||
    !str ||
    str.length === 0 ||
    str === "" ||
    !/[^\s]/.test(str) ||
    /^\s*$/.test(str) ||
    str.replace(/\s/g, "") === ""
  )
    return true;
  else return false;
};
