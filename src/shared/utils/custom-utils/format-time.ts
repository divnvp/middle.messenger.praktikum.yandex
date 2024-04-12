export function formatTime(time: string | undefined): string {
  if (time) {
    return new Date(time).toLocaleTimeString().substring(0, 5);
  }

  return '';
}