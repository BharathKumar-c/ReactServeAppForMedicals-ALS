

/** With internet credentials */

const setSecureValue = (key, value) =>
  localStorage.setItem(key, key, value);

const getSecureValue = async key => {
  const result = await localStorage.getItem(key);
  if (result) {
    return result.password;
  }
  return false;
};

const removeSecureValue = key =>
  localStorage.removeItem(key);

export default { setSecureValue, getSecureValue, removeSecureValue };
