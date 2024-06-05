export class UserDto
{
    id?: number
    username: string
    password: string
    role?: "admin" | "student" | "lecturer"
    type?: string
}
