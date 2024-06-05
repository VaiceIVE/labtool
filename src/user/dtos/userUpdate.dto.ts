export class UserUpdateDto
{
    username?: string
    nickname?: string
    password?: string
    role?: "admin" | "student" | "lecturer"
    refreshToken?: string
    avataruri?: string
}
