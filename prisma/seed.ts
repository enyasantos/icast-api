import { PrismaClient, Prisma } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'admin@example.com',
    password: '',
    firstName: 'Admin',
    lastName: 'Admin last',
    country: 'Brazil',
    state: 'Minas Gerais',
    city: 'Mariana',
    role: 'ADMIN',
  },
  {
    email: 'podcaster@example.com',
    password: '',
    firstName: 'Podcaster',
    lastName: 'Podcaster last',
    country: 'Brazil',
    state: 'Minas Gerais',
    city: 'Mariana',
    role: 'PODCASTER',
  },
  {
    email: 'default_user@example.com',
    password: '',
    firstName: 'Default',
    lastName: 'User last',
    country: 'Brazil',
    state: 'Minas Gerais',
    city: 'Mariana',
    role: 'DEFAULT_USER',
  },
];

const avatar = 'default-user.png';

async function main() {
  console.log(`Start seeding ...`);
  for (const user of userData) {
    const userExists = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (!userExists) {
      const salt = await genSalt();
      const password = await hash('123123123a', salt);
      const createUser = await prisma.user.create({
        data: { ...user, password },
      });

      console.log(`Created user with id: ${createUser.id}`);

      if (createUser) {
        await prisma.avatar.create({
          data: {
            filename: avatar,
            userId: createUser.id,
          },
        });

        console.log(`Created avatar user with id: ${createUser.id}`);
      }
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
