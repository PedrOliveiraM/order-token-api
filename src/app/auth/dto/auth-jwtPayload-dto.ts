import { Role } from "src/enums/role.enum"

export interface JwtPayload {
  sub: string
  email: string,
  roles: Role
}