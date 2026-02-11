import * as _ from '@Index';

_.test.describe('POST - /auth/signup - @api', async () => {
    _.test('Customer Sign Up', async ({ request }) => {

        try {
            const api = new _.Api(request);
            const user = _.generateRandomUser();

            const response = await api.post('/auth/signup', {

                firstName: user.firstName,
                lastName: user.lastName,
                email: user.userEmail,
                phone: user.mobileNumber,
                birthDate: '01-01-2000',
                role: 'customer'
            });

            _.CheckStatus;
            const body = await _.CheckStatus.ok(response, 201);
            console.log(body);
        }

        catch (error) {
            console.log("Something Went Wrong.\m", error);
        }

    });
});