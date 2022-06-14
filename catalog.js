import http from 'k6/http';
import { check, sleep } from 'k6';

const url1 = 'https://stapi.technodom.kz/katalog/api/v1/products/filters?city_id=5f5f1e3b4c8a49e692fefd70&category=smartfony&sorting=score&price=0';
const url2 = 'https://stapi.technodom.kz/katalog/api/v1/products/category/smartfony?city_id=5f5f1e3b4c8a49e692fefd70&limit=24&sorting=score&price=0';

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
  let res1 = http.get(url1);

  check(res1, {
    'res1 status is 200': (r) => r.status === 200,
    'get all filters': (r) => r.json().filters.length > 22,
  }); 

  let res2 = http.get(url2);

  check(res2, {
    'res2 status is 200': (r) => r.status === 200,
    'get correct products data': (r) => r.json().limit === 24 && r.json().payload.length === 24,
  });

  sleep(0.5);

  let res3 = http.get(`${url1}&brands=apple`);

  check(res3, {
    'res3 with status is 200': (r) => r.status === 200,
    'get all filters for apple': (r) => r.json().filters.length > 21,
  }); 

  let res4 = http.get(`${url2}&brands=apple`);

  check(res4, {
    'res4 status is 200': (r) => r.status === 200,
    'get correct products data for apple': (r) => r.json().limit === 24 && r.json().payload.length === 24,
  });
}