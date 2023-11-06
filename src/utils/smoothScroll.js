export const smoothScrollTo = (endY, duration) => {
  const startY = window.scrollY;
  const diffY = endY - startY;
  let startTime;

  const easeInOutQuad = (time, start, diff, duration) => {
    time /= duration / 2;
    if (time < 1) return (diff / 2) * time * time + start;
    time--;
    return (-diff / 2) * (time * (time - 2) - 1) + start;
  };

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const time = timestamp - startTime;
    const newY = easeInOutQuad(time, startY, diffY, duration);
    window.scrollTo(0, newY);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};