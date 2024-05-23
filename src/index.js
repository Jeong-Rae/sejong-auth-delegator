import AuthController from "./controller/AuthController.js";
import AuthService from "./service/AuthService.js";
import UserProfileService from "./service/UserProfileService.js";
import LoginRequestDto from "./dto/LoginRequestDto.js";

function sejongAuthDelegator() {
    const authService = new AuthService();
    const userProfileService = new UserProfileService();
    const authController = new AuthController(authService, userProfileService);

    return {
        async getAuthenticatedJsessionId(loginRequestDto) {
            await authController.authenticate(loginRequestDto);
            return authService.jsessionId;
        },

        async isAuthenticatedUser(loginRequestDto) {
            const isAuthenticated = await authController.authenticate(
                loginRequestDto
            );
            return isAuthenticated;
        },

        async getUserProfile(loginRequestDto) {
            return authController.login(loginRequestDto);
        },

        createLoginRequestDto(userId, password) {
            return new LoginRequestDto(userId, password);
        },
    };
}

export default sejongAuthDelegator;
export { LoginRequestDto, sejongAuthDelegator };
