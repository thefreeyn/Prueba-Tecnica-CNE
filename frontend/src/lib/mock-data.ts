import { User } from "@/types";

const MOCK_USER: User = {
  id: "1",
  name: "Usuario Demo",
  email: "demo@prueba.com",
  createdAt: "2025-01-15T10:00:00.000Z",
};

const MOCK_PASSWORD = "123456";

export function getMockUser(): User {
  return { ...MOCK_USER };
}

export function validateCredentials(email: string, password: string): boolean {
  return email === MOCK_USER.email && password === MOCK_PASSWORD;
}

let currentName = MOCK_USER.name;

export function getMockUserName(): string {
  return currentName;
}

export function setMockUserName(name: string): void {
  currentName = name;
}
