import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 400 },
    { duration: '1m', target: 400 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500']
  },
};

export default () => {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const payload1 = JSON.stringify({
    city_id: "5f5f1e3b4c8a49e692fefd70",
  });

  const req1 = http.post('https://stapi.technodom.kz/cart/api/v2/carts', payload1, params);
  const cartId = req1.json().id;//62aa9a8936d72c5844787c78'//
  const sku =  "258749";
  
  sleep(1);

  const payload = JSON.stringify({
    product: { sku, type: "regular" },
    related_products: []
  });
   

  const addToCartReq = http.post(`https://stapi.technodom.kz/cart/api/v2/carts/${cartId}/products?city_id=5f5f1e3b4c8a49e692fefd70`, payload, params);

  check(addToCartReq, {
    'addToCartReq status is 200': (r) => r.status === 200,
    'addToCartReq success': (r) => r.body.includes('product_count'),
  });  
}