import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const users = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          name: `User ${i + 1}`,
          password: `password${i + 1}`,
        },
      }),
    ),
  );

  const questionnaires = await Promise.all(
    Array.from({ length: 40 }, (_, i) =>
      prisma.questionnaire.create({
        data: {
          title: `Questionnaire ${i + 1}`,
          description: `Description for questionnaire ${i + 1}`,
          userId: users[i % 10].id,
          questions: {
            create: [
              {
                title: `Question 1 for Q${i + 1}`,
                type: QuestionType.ONE_CHOICE,
                variants: {
                  create: [
                    { title: 'Option 1' },
                    { title: 'Option 2' },
                    { title: 'Option 3' },
                  ],
                },
              },
              {
                title: `Question 2 for Q${i + 1}`,
                type: QuestionType.MULTIPLE_CHOICE,
                variants: {
                  create: [
                    { title: 'Choice 1' },
                    { title: 'Choice 2' },
                    { title: 'Choice 3' },
                    { title: 'Choice 4' },
                  ],
                },
              },
              {
                title: `Question 3 for Q${i + 1}`,
                type: QuestionType.TEXT,
              },
            ],
          },
        },
      }),
    ),
  );

  console.log('Database seeded successfully!');
  console.log(`Created ${users.length} users`);
  console.log(`Created ${questionnaires.length} questionnaires`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
