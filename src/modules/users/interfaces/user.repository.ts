import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";

export abstract class IUserRepository {
  abstract create(user: CreateUserDto ): Promise<UserResponseDto>;
  abstract findAll(): Promise<UserResponseDto[]>;

  abstract findById(id: string): Promise<UserResponseDto | null>;
  abstract findByEmail(email: string): Promise<UserResponseDto | null>;

  abstract update(id: string, user: Partial<UserResponseDto>): Promise<UserResponseDto | null>;
  abstract delete(id: string): Promise<void>;

}