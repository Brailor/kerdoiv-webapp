export const isEmpty = (value, allowEmptyString) =>
    value == null ||
    (!allowEmptyString ? value === '' : false) ||
    (Array.isArray(value) && value.length === 0);
