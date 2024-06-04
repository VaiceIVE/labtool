export class UserUpdateDto
{
    username?: string
    nickname?: string
    password?: string
    role?: "admin" | "user" | "inspector"
    refreshToken?: string
    avataruri?: string
}
