import ProfileResponseDto from "../dto/ProfileResponseDto.js";
import cheerio from "cheerio";

class UserProfileService {
    constructor() {
        this.profileEndpoint =
            "http://classic.sejong.ac.kr/userCertStatus.do?menuInfoId=MAIN_02_05";
    }

    async fetchUserProfile(jsessionId) {
        try {
            const profileResponse = await fetch(this.profileEndpoint, {
                method: "GET",
                headers: {
                    Cookie: `JSESSIONID=${jsessionId}`,
                },
                redirect: "follow",
            });

            const profileHtml = await profileResponse.text();
            return this.parseProfileFromHtml(profileHtml);
        } catch (error) {
            console.error(error);
        }
    }

    parseProfileFromHtml(html) {
        const $ = cheerio.load(html);

        const profileData = $("div.contentWrap li dl dd")
            .map((_, el) => $(el).text().trim())
            .get();

        const profileResponseDto = new ProfileResponseDto(...profileData);

        return profileResponseDto;
    }
}

export default UserProfileService;
