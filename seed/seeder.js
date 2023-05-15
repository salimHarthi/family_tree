// ESM
import { faker } from '@faker-js/faker';

// CJS
const { faker } = require('@faker-js/faker');

const createRandomUser = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
  };
};

export const usersSeed = faker.helpers.multiple(createRandomUser, {
  count: 100,
});

const createRandomFamily = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    familyName: faker.person.lastName(),
    flow: {
      edges: [],
      nodes: [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
        },
      ],
      viewport: [{ x: 0, y: 0, zoom: 0.5 }],
    },
    users: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: [
          {
            type: String,
            enum: ['view', 'edit'],
            default: 'view',
          },
        ],
      },
    ],
    logo: faker.image.avatar(),
    isPublic: true,
  };
};

export const familySeed = faker.helpers.multiple(createRandomFamily, {
  count: 100,
});
