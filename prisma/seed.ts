import { PrismaClient, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.paymentRequest.deleteMany();

  const now = new Date();
  const requestId1 = `req_${now.getTime() - 10000}`;
  const requestId2 = `req_${now.getTime() - 20000}`;

  await prisma.paymentRequest.create({
    data: {
      requestId: requestId1,
      amount: 19.99,
      creditor: 'Old Magazine Subscription',
      description: 'Monthly issue',
      status: PaymentStatus.DEFERRED,
    },
  });

  await prisma.paymentRequest.create({
    data: {
      requestId: requestId2,
      amount: 1500.0,
      creditor: 'Ghostly Services Inc.',
      description: 'Ectoplasmic consultation',
      status: PaymentStatus.VANISHED,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });