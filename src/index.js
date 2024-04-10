import AuthController from "./controllers/AuthController.js";
import AuthService from "./services/AuthService.js";
import UserProfileService from "./services/UserProfileService.js";
import LoginRequestDto from "./dto/LoginRequestDto.js";

class SejongAuthDelegator {
    constructor() {
        const authService = new AuthService();
        const userProfileService = new UserProfileService();
        this.authController = new AuthController(
            authService,
            userProfileService
        );
    }

    async getAuthenticatedJsessionId(loginRequestDto) {
        await this.authController.authenticate(loginRequestDto);
        return this.authController.authService.jsessionId;
    }

    async isAuthenticatedUser(loginRequestDto) {
        const isAuthenticated = await this.authController.authenticate(
            loginRequestDto
        );
        return isAuthenticated;
    }

    async getUserProfile(loginRequestDto) {
        return this.authController.login(loginRequestDto);
    }

    createLoginRequestDto(userId, password) {
        return new LoginRequestDto(userId, password);
    }
}

export default SejongAuthDelegator;
