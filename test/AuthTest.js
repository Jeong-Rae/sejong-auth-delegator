import { strict as assert } from "assert";
import { LoginRequestDto, sejongAuthDelegator } from "../src/index.js";

const loginFailedTest = async () => {
    const delegator = sejongAuthDelegator();
    const loginRequestDto = new LoginRequestDto("21011000", "q1w2e3r4!");

    try {
        const profile = await delegator.getUserProfile(loginRequestDto);
        console.log(profile);

        assert.fail("Test Failed: loginFailedTest");
    } catch (error) {
        assert.match(
            error.message,
            /Failed : login failed/,
            "Unexpected error message"
        );
        console.log("Test Passed: loginFailedTest");
    }
};

const loginSuccessTest = async () => {
    const delegator = sejongAuthDelegator();
    const loginRequestDto = new LoginRequestDto(
        "21013216",
        process.env.TEST_USER_PASSWORD
    );

    try {
        const profile = await delegator.getUserProfile(loginRequestDto);
        console.log("Test Passed: loginSuccessTest");
    } catch (error) {
        assert.match(
            error.message,
            /Failed : login failed/,
            "Unexpected error message"
        );
        assert.fail("Test Failed: loginSuccessTest");
    }
};

loginFailedTest();
if (process.env.TEST_USER_PASSWORD) {
    loginSuccessTest();
} else {
    console.log(process.env.TEST_USER_PASSWORD);
    console.log(
        "정상 로그인 테스트 시에는 환경변수 'TEST_USER_PASSWORD'에 비밀번호를 등록해주세요"
    );
    console.log("Windows : $Env:TEST_USER_PASSWORD = 'password'");
    console.log("MacOS : export TEST_USER_PASSWORD = 'password'");
}
