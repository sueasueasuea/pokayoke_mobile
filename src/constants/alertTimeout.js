export const delay = (ms = 2000) => {
    const timer = setTimeout(() => {

    }, ms);
    clearTimeout(timer)
};
