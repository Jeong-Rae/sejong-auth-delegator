import AuthController from "./controllers/AuthController.js";
import AuthService from "./services/AuthService.js";
import UserProfileService from "./services/UserProfileService.js";

class SejongAuthDelegator {
    constructor() {
        const authService = new AuthService();
        const userProfileService = new UserProfileService();
        this.authController = new AuthController(
            authService,
            userProfileService
        );
    }

    async login(loginRequestDto) {
        return this.authController.login(loginRequestDto);
    }
}

export default SejongAuthDelegator;
