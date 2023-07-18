import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const createRandomUser = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    password: bcrypt.hashSync('1234', 10),
    email: faker.internet.email(),
    image: faker.image.avatar(),
  };
};

export const usersSeed = faker.helpers.multiple(createRandomUser, {
  count: 20,
});

const createRandomFamily = (userId) => {
  return {
    _id: faker.database.mongodbObjectId(),
    familyName: faker.person.lastName(),
    flow: {
      edges: [{ id: 'e1-2', source: '1', target: '2' }],
      nodes: [
        {
          data: {
            birthday: '1995/2/2',
            name: faker.person.fullName(),
            image: faker.image.avatar(),
          },
          height: 445,
          id: '1',
          position: { x: 0, y: 0 },
          positionAbsolute: { x: 0, y: 0 },
          type: 'imageNode',
          width: 240,
        },
        {
          data: {
            birthday: '1995/2/2',
            name: faker.person.fullName(),
            image: faker.image.avatar(),
          },
          height: 445,
          id: '2',
          position: { x: 0, y: 470 },
          positionAbsolute: { x: 0, y: 470 },
          type: 'imageNode',
          width: 240,
        },
      ],
      viewport: [{ x: 0, y: 0, zoom: 0.5 }],
    },
    // users: [
    //   {
    //     userId: userId,
    //     role: ['view', 'edit'],
    //   },
    // ],
    creator: userId,
    logo: faker.image.avatar(),
    isPublic: true,
  };
};
export const familySeed = [];
for (let i = 0; i < 20; i++) {
  familySeed.push(createRandomFamily(usersSeed[i]._id));
}
