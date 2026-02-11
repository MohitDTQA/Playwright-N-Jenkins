import * as _ from '@Index';

_.test.describe('POST - /auth/signin - @api', async () => {
  _.test('Customer Sign In', async ({ request }) => {
    const api = new _.Api(request);

    const response = await api.post('/auth/signin', {
      phone: '0987654321',
    });

    _.CheckStatus;
    const body = await _.CheckStatus.ok(response, 200);
    console.log(body);
  });
});