/**
 * 로그인 요청시 사용되는 dto
 * @class
 * @param {string} userId - sju 통합 로그인 ID
 * @param {string} password - sju 통합 로그인 Password
 */
class LoginRequestDto {
    constructor(userId, password) {
        this.userId = userId;
        this.password = password;
    }
}

export default LoginRequestDto;
