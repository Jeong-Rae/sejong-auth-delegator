class AuthService {
    constructor() {
        this.resourceEndpoint = "https://classic.sejong.ac.kr/userLogin.do";
        this.jsessionId = null;
    }

    async fetchJsessionId() {
        try {
            const response = await fetch("http://classic.sejong.ac.kr", {
                method: "GET",
            });
            const cookieHeader = response.headers.get("set-cookie");
            this.jsessionId = this.extractJsessionIdFromCookie(cookieHeader);
        } catch (error) {
            throw new Error("Failed : failed to fetch JSESSIONID");
        }
    }

    extractJsessionIdFromCookie(cookieHeader) {
        const matches = cookieHeader.match(/JSESSIONID=([^;]+)/);
        return matches ? matches[1] : null;
    }

    async authenticate(loginRequestDto) {
        if (!this.jsessionId) {
            await this.fetchJsessionId();
        }

        const completeRequestUrl = `${this.resourceEndpoint}?userId=${loginRequestDto.userId}&password=${loginRequestDto.password}`;

        try {
            const loginResponse = await fetch(completeRequestUrl, {
                method: "POST",
                headers: {
                    Cookie: `JSESSIONID=${this.jsessionId}`,
                },
                redirect: "follow",
            });

            const responseBody = await loginResponse.text();

            if (responseBody.includes("로그인 정보가 올바르지 않습니다.")) {
                throw new Error("Failed: Login");
            }
            return true;
        } catch (error) {
            throw new Error("Failed : login failed");
        }
    }

    changeResourceServerUrl(newUrl) {
        this.resourceEndpoint = newUrl;
    }
}

export default AuthService;
