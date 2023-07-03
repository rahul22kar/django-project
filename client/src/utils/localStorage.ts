const USER_DATA_KEY = "userData";

export const setUserData = (userId: string, name: string) => {
  if (!userId || !name) return;
  window.localStorage.setItem(
    USER_DATA_KEY,
    JSON.stringify({ id: userId, name })
  );
};

export const getUserData = () => {
  const userData = window.localStorage.getItem(USER_DATA_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      clearUserData();
    }
  }
  return null;
};

export const clearUserData = () => {
  window.localStorage.removeItem(USER_DATA_KEY);
};
