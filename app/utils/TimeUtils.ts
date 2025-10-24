import dayjs from 'dayjs';

export const formatTime = (value: string | number, formatStr = 'YYYY/MM/DD'): string => {
  return dayjs(value).format(formatStr);
};
