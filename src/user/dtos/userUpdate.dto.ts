export class UserUpdateDto
{
    username?: string
    nickname?: string
    password?: string
    role?: "admin" | "user" | "lecturer"
    refreshToken?: string
    avataruri?: string
}
