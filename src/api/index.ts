import { ENDPOINTS } from './constans';

const baseOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const request = <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  return fetch(
    `${ENDPOINTS.base}${endpoint}`,
    {
      ...baseOptions,
      ...options,
    },
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`${res.status}`);
    });
};
