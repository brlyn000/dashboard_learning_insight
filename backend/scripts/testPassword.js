import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testPassword = async () => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: 'igihcksn@gmail.com' }
    });
    
    if (!user) {
      console.log('User not found');
      return;
    }
    
    console.log('User found:', user.email);
    console.log('Stored password hash:', user.password);
    
    const testPasswords = ['password123', 'defaultpassword'];
    
    for (const pwd of testPasswords) {
      const match = await bcrypt.compare(pwd, user.password);
      console.log(`Password "${pwd}": ${match ? 'MATCH' : 'NO MATCH'}`);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
};

testPassword();