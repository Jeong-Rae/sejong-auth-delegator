class AuthService {
    constructor() {
        this.resourceEndpoint = "https://classic.sejong.ac.kr/userLogin.do";
        this.jsessionId = null;
    }

    // JSESSIONID 획득
    async fetchJsessionId() {
        try {
            const response = await fetch("http://classic.sejong.ac.kr", {
                method: "GET",
            });
            const cookieHeader = response.headers.get("set-cookie");
            this.jsessionId = this.extractJsessionIdFromCookie(cookieHeader);
        } catch (error) {
            console.error(error);
        }
    }

    extractJsessionIdFromCookie(cookieHeader) {
        const matches = cookieHeader.match(/JSESSIONID=([^;]+)/);
        return matches ? matches[1] : null;
    }

    // 로그인 인가
    async authenticate(loginRequestDto) {
        if (!this.jsessionId) {
            await this.fetchJsessionId();
        }
        console.log("Using JSESSIONID:", this.jsessionId);

        const completeRequestUrl = `${this.resourceEndpoint}?userId=${loginRequestDto.userId}&password=${loginRequestDto.password}`;
        console.log(completeRequestUrl);

        try {
            const loginResponse = await fetch(completeRequestUrl, {
                method: "POST",
                headers: {
                    Cookie: `JSESSIONID=${this.jsessionId}`,
                },
                redirect: "follow",
            });

            const responseBody = await loginResponse.text();

            if (responseBody.includes("접속자 정보")) {
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
        }
    }

    changeResourceServerUrl(newUrl) {
        this.resourceEndpoint = newUrl;
    }
}

export default AuthService;
