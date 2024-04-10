class AuthController {
    constructor(authService, userProfileService) {
        this.authService = authService;
        this.userProfileService = userProfileService;
    }

    async authenticate(loginRequestDto) {
        const isAuthenticated = await this.authService.authenticate(
            loginRequestDto
        );
        return isAuthenticated;
    }

    async login(loginRequestDto) {
        const isAuthenticated = await this.authenticate(loginRequestDto);
        if (isAuthenticated) {
            const response = await this.userProfileService.fetchUserProfile(
                this.authService.jsessionId
            );
            return response;
        }
        return null;
    }
}

export default AuthController;
