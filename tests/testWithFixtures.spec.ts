import {test} from '../test-options';
import {PageManager} from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';

test('Fixtures - submit using grid Form', async({pageManager}) => {
    const randomFullName = faker.person.fullName();
    const email = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@gmail.com`;
    
    await pageManager.onFormLayoutPage().submitUsingGridFormWithCredentialsAndSelectOption(email, process.env.PASSWORD+"", "Option 2"); 
});
