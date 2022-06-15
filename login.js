import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 500 },
    { duration: '1m', target: 500 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500']
  },
};

export default () => {
  // const checkUserReq = http.get('https://stapi.technodom.kz/sso/api/v1/profile/kind?phone=77719110171');
  const checkUserReq = http.get('https://sso.technodom.kz/api/v1/profile/kind?phone=77719110171');

  check(checkUserReq, {
    'checkUserReq status is 200': (r) => r.status === 200,
    // 'user exist': (r) => r.json().type === "full",
  });

  
  sleep(1);

  const payload = JSON.stringify({
    phone: "77719110171",
    password: "Password1"
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // const signInReq = http.post('https://stapi.technodom.kz/sso/api/v1/auth/signin/phone', payload, params);
  const signInReq = http.post('https://sso.technodom.kz/api/v1/auth/signin/phone', payload, params);

  check(signInReq, {
    'signInReq status is 200': (r) => r.status === 200,
    // 'signIn success': (r) => r.body.includes('SignIn success'),
  });  
}