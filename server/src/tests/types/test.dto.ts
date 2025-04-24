export type CreateTestDto = {
    title: string;
    description?: string;
    testTime?: number;
    passingThreshold?: number;
  };
  
  export type UpdateTestDto = Partial<CreateTestDto>;
  
  export type TestResponse = {
    id: number;
    title: string;
    description?: string | null; // Разрешаем null
    accessLink: string | null;  // Разрешаем null
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  };
  
  export type TestListResponse = {
    tests: TestResponse[];
    total: number;
  };