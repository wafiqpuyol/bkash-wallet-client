export const getLocalStorageItem = (key: string) => {
    const data = window.localStorage.getItem(key) as string;
    return JSON.parse(data);
};

export const setLocalStorageItem = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};
