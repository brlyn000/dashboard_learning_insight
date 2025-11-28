import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hashPasswords = async () => {
  try {
    const users = await prisma.users.findMany({
      where: {
        password: 'defaultpassword'
      }
    });

    console.log(`Found ${users.length} users with default password`);

    for (const user of users) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      await prisma.users.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
    }

    console.log('All passwords hashed successfully!');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
};

hashPasswords();