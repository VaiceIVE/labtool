export class CreateUserDto
{
    nickname: string
    username: string
    password: string
    avatar?: string
    role: "user" | "admin" | "inspector"
}
