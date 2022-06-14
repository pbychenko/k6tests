import http from 'k6/http';
import { check, sleep } from 'k6';

const url = 'https://api.r46.technodom.kz/search?shop_id=74fd3b613553b97107bc4502752749&did=aNpqI75eZ8&type=instant_search&search_query=apple%20iphone%2012&segment=&extended=&exact_field_match=&referer=https%3A%2F%2Fnext-stage.technodom.kz%2F';

export const options = {
  stages: [
    { duration: '30s', target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '1m', target: 500 }, // stay at 100 users for 10 minutes
    { duration: '30s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default () => {
  let res = http.get(url);

  check(res, {
    'res1 status is 200': (r) => r.status === 200,
    'get correct products data': (r) => r.json().products.length > 0 && r.json().products[0].name.includes('Смартфон Apple iPhone 12'),
  });
}