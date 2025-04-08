export type UserResponseDto = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}