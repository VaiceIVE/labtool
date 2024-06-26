export class UserDto
{
    id?: number
    username: string
    password: string
    role?: "admin" | "user" | "inspector"
    type?: string
}
