import { PrismaClient } from '../generated/prisma/client';
import { CreateTestDto, UpdateTestDto, TestResponse, TestListResponse } from './types/test.dto';
import { generateTestLink } from '../common/utils/link-generator';

const prisma = new PrismaClient();

const testSelect = {
  id: true,
  title: true,
  description: true,
  accessLink: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
};

export const TestService = {
  async createTest(userId: number, dto: CreateTestDto): Promise<TestResponse> {
    return prisma.test.create({
      data: {
        ...dto,
        creatorId: userId,
        accessLink: generateTestLink(),
      },
      select: testSelect,
    });
  },

  async getTests(userId: number): Promise<TestListResponse> {
    const [tests, total] = await Promise.all([
      prisma.test.findMany({
        where: { creatorId: userId },
        select: testSelect,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.test.count({ where: { creatorId: userId } }),
    ]);

    return { tests, total };
  },

  async getTestById(userId: number, testId: number): Promise<TestResponse> {
    const test = await prisma.test.findUniqueOrThrow({
      where: { id: testId, creatorId: userId },
      select: testSelect,
    });

    return test;
  },

  async updateTest(userId: number, testId: number, dto: UpdateTestDto): Promise<TestResponse> {
    return prisma.test.update({
      where: { id: testId, creatorId: userId },
      data: dto,
      select: testSelect,
    });
  },

  async deleteTest(userId: number, testId: number): Promise<void> {
    await prisma.test.delete({
      where: { id: testId, creatorId: userId },
    });
  },
};