import http from 'k6/http';
import { check } from 'k6';


// const url1 = 'https://stapi.technodom.kz/menu/api/v1/menu/top?city_id=5f5f1e3b4c8a49e692fefd70';
const url1 = 'https://api.technodom.kz/menu/api/v1/menu/top?city_id=5f5f1e3b4c8a49e692fefd70'
// const url2 = 'https://stapi.technodom.kz/menu/api/v1/menu/footer?city_id=5f5f1e3b4c8a49e692fefd70';
const url2 = 'https://api.technodom.kz/menu/api/v1/menu/footer?city_id=5f5f1e3b4c8a49e692fefd70';

export const options = {
  stages: [
    { duration: '30s', target: 300 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '1m', target: 300 }, // stay at 100 users for 10 minutes
    { duration: '30s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default () => {
  const res1 = http.get(url1);

  check(res1, {
    'res1 status is 200': (r) => r.status === 200,
    'get all top data': (r) => r.body.includes('items'),
    // 'get all filters': (r) => r.json().items.length > 0,
  });
   

  const res2 = http.get(url2);

  check(res2, {
    'res2 status is 200': (r) => r.status === 200,
    'get all bottom data': (r) => r.body.includes('items'),
    // 'get correct products data': (r) => r.json().limit === 24 && r.json().payload.length === 24,
  });
}