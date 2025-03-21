export function textSlicer(txt: string, max: number = 80) {
  if (txt.length > max) {
    return `${txt.slice(0, max)} ...`;
  } else {
    return txt;
  }
}
