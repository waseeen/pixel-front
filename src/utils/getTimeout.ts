const getTimeout = () => {
  return (Number(localStorage.getItem('cooldown') ?? 0) - Date.now()) / 1000;
};
export default getTimeout;
