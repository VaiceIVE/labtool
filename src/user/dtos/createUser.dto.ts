export class CreateUserDto
{
    nickname: string
    username: string
    password: string
    group: string
    avatar?: string
    role: "student" | "admin" | "lecturer"
}
