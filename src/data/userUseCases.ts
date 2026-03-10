import { UseCase, UseCaseStatus } from "./useCases";

export interface UserUseCase extends UseCase {
  aiToolsUsed: string[];
  finalProduct: string[];
  aiUsageMethod: string;
  prompt: string;
  microlearningLink: string;
  attachments: string[];
}

// In-memory store for user-submitted use cases
let userUseCases: UserUseCase[] = [];

export const addUserUseCase = (uc: UserUseCase) => {
  userUseCases = [...userUseCases, uc];
};

export const getUserUseCases = () => userUseCases;
