import { PrismaClient, Student } from '@prisma/client';
import { faker, fakerPT_BR } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUser() {
  const password = await bcrypt.hash('1234567', 10);

  const user = await prisma.user.create({
    data: {
      name: fakerPT_BR.person.fullName(),
      email: fakerPT_BR.internet.email().toLowerCase(),
      password
    }
  })

  console.log({ ...user, password: '1234567' });
  return user;
}

async function createStudents() {
  const student = await prisma.student.create({
    data: {
      ra: String(fakerPT_BR.number.int({min: 1, max: 999})),
      name: fakerPT_BR.person.fullName(),
      email: fakerPT_BR.internet.email().toLowerCase(),
      cpf: fakerPT_BR.string.numeric(11),
    }
  })
  return student
}

async function seedDatabase() {
  console.log('🌱 Iniciando seed...');

  // Create 15 students
  const studentPromises: Promise<Student>[] = [];
  for (let i = 0; i < 15; i++) {
    studentPromises.push(createStudents());
  }
  console.log('✅ 15 alunos criados!');

  // Create 1 user
  createUser()
  console.log('✅ 1 usuario criado!');
}

seedDatabase().catch((error) => {
  console.error('❌ Erro ao criar seed:', error);
  process.exit(1);
})
