class AuthController {
    constructor(authService, userProfileService) {
        this.authService = authService;
        this.userProfileService = userProfileService;
    }

    async login(loginRequestDto) {
        await this.authService.authenticate(loginRequestDto);
        const response = await this.userProfileService.fetchUserProfile(
            authService.jsessionId
        );
        return response;
    }
}

export default AuthController;
