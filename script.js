import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '5s',
};

export default function () {
  http.get('https://api.technodom.kz/menu/api/v1/menu/katalog?city_id=5f5f1e3b4c8a49e692fefd70');
  sleep(1);
}