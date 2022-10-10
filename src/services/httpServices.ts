import Config from 'react-native-config';

const { API_URL } = Config;

type RequestParams = {
  url: string;
  method: string;
  data: any;
};

export function request({ url, method, data }: RequestParams) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(`${API_URL}/${url}`, options);
}
