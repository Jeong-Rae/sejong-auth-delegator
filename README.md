# SejongAuthDelegator

# 목차

-   [소개](#소개)
-   [사용가능한 메서드](#사용가능한-메서드)
    -   [getUserProfile](#getuserprofileloginrequestdto-loginrequestdto-promiseprofileresponsedto--null)
    -   [getAuthenticatedJsessionId](#getauthenticatedjsessionidloginrequestdto-loginrequestdto-promisestring--null)
    -   [isAuthenticatedUser](#isauthenticateduserloginrequestdto-loginrequestdto-promiseboolean)
    -   [createLoginRequestDto](#createloginrequestdtouserid-string-password-string-loginrequestdto)
-   [DTO 객체](#dto-객체)
    -   [LoginRequestDto](#loginrequestdto)
    -   [ProfileResponseDto](#profileresponsedto)
-   [설치방법](#설치방법)
-   [사용예시](#사용예시)
    -   [CJS](#cjs)
    -   [ESM](#esm)
-   [이슈등록](#이슈등록)
    -   [패치내역](#패치내역)

# 소개

SejongAuthDelegator는 세종대학교의 인증 시스템을 위해 개발된 라이브러리입니다. 사용자의 ID와 패스워드를 이용해 세종대학교 시스템에 로그인하고, 인증된 세션을 통해 사용자의 프로필 정보를 가져올 수 있습니다.

# 사용가능한 메서드

## 메서드

### `getUserProfile(loginRequestDto: LoginRequestDto): Promise<ProfileResponseDto> | null`

#### 설명

세종대학교 사용자 프로필 정보를 조회하여 반환합니다.

#### 인자

-   `loginRequestDto`: `LoginRequestDto` 객체

#### 반환값

| 조건 | 반환 타입            | 설명                            |
| ---- | -------------------- | ------------------------------- |
| 성공 | `ProfileResponseDto` | 사용자 프로필 정보              |
| 실패 | `null`               | 사용자 인증 실패 시 `null` 반환 |

---

### `getAuthenticatedJsessionId(loginRequestDto: LoginRequestDto): Promise<string> | null`

#### 설명

사용자를 인증하고 세션 ID(`jsessionId`)를 반환합니다.

#### 인자

-   `loginRequestDto`: `LoginRequestDto` 객체

#### 반환값

| 조건 | 반환 타입 | 설명                                    |
| ---- | --------- | --------------------------------------- |
| 성공 | `string`  | 인증된 사용자의 세션 ID (유효기간 존재) |
| 실패 | `null`    | 사용자 인증 실패 시 `null` 반환         |

---

### `isAuthenticatedUser(loginRequestDto: LoginRequestDto): Promise<boolean>`

#### 설명

사용자의 인증 가능 여부를 판단합니다.

#### 인자

-   `loginRequestDto`: `LoginRequestDto` 객체

#### 반환값

| 조건 | 반환 타입 | 설명                        |
| ---- | --------- | --------------------------- |
| 성공 | `boolean` | 사용자 인증 성공 시 `true`  |
| 실패 | `boolean` | 사용자 인증 실패 시 `false` |

---

### `createLoginRequestDto(userId: string, password: string): LoginRequestDto`

#### 설명

`userId`와 `password`를 받아서 `LoginRequestDto` 객체를 생성합니다.

#### 인자

-   `userId`: 사용자 ID
-   `password`: 사용자 비밀번호

#### 반환값

-   `LoginRequestDto`: 생성된 `LoginRequestDto` 객체

---

## 객체

### LoginRequestDto

사용자 로그인 요청 정보를 담는 객체입니다.

| 필드명   | 타입   | 설명                     |
| -------- | ------ | ------------------------ |
| userId   | string | sju 통합 로그인 ID       |
| password | string | sju 통합 로그인 Password |

### ProfileResponseDto

사용자 프로필 정보를 담는 객체입니다.

| 필드명             | 타입   | 설명             |
| ------------------ | ------ | ---------------- |
| major              | string | 전공             |
| studentCode        | string | 학번             |
| name               | string | 이름             |
| gradeLevel         | number | 학년             |
| userStatus         | string | 사용자 상태      |
| completedSemesters | number | 이수한 학기 수   |
| verifiedSemesters  | number | 인증받은 학기 수 |

# 설치방법

npm에 배포되어 있는 라이브러리를 install 하여 사용하는 것이 권장된다.

```shell
npm i @coffee-tree/sejong-auth-delegator
```

# 사용예시

`cjs(commonjs)`와 `esm(module)` 방식 모두 지원된다.

## CJS

### Then 방식

```js
const {
    sejongAuthDelegator,
    LoginRequestDto,
} = require("@coffee-tree/sejong-auth-delegator");

const login = (userId, password) => {
    const delegator = sejongAuthDelegator();

    const loginRequestDto = new LoginRequestDto(userId, password);

    const profile = delegator
        .getUserProfile(loginRequestDto)
        .then((userProfile) => {
            return userProfile;
        })
        .catch((error) => {
            console.error("Error fetching user profile", error);
            throw error;
        });

    return profile;
};
```

### Async/Await 방식

```js
const {
    sejongAuthDelegator,
    LoginRequestDto,
} = require("@coffee-tree/sejong-auth-delegator");

const login = (userId, password) => {
    const delegator = sejongAuthDelegator();

    const loginRequestDto = new LoginRequestDto(userId, password);

    try {
        const userProfile = await delegator.getUserProfile(loginRequestDto);
        return userProfile;
    } catch (error) {
        console.error("Error fetching user profile", error);
        throw error;
    }
};
```

## ESM

### Promise 방식

```js
import {
    sejongAuthDelegator,
    LoginRequestDto,
} from "@coffee-tree/sejong-auth-delegator";

const login = (userId, password) => {
    const delegator = sejongAuthDelegator();

    const loginRequestDto = new LoginRequestDto(userId, password);

    const profile delegator
        .getUserProfile(loginRequestDto)
        .then((userProfile) => {
            return userProfile;
        })
        .catch((error) => {
            console.error("Error fetching user profile", error);
            throw error;
        });

    return profile;
};
```

### Async/Await 방식

```js
import {
    sejongAuthDelegator,
    LoginRequestDto,
} from "@coffee-tree/sejong-auth-delegator";

const login = (userId, password) => {
    const delegator = sejongAuthDelegator();

    const loginRequestDto = new LoginRequestDto(userId, password);

    try {
        const profile = await delegator.getUserProfile(loginRequestDto);
        return profile;
    } catch (error) {
        console.error("Error fetching user profile", error);
        throw error;
    }
};
```

# 이슈등록

코드에 오류 및 개선사항이 있을 경우 해당 저정소에 이슈를 남겨주시면 감사합니다  
[`sejong-auth-delegator-github`](https://github.com/Jeong-Rae/sejong-auth-delegator/issues)

# 패치내역

### 2024-05-23

-   로그인 성공 판단 기준을 변경하였습니다
-   TEST 검증 코드를 추가하였습니다.
-   `LoginRequestDTO` 클래스를 직접 반환받아 사용할 수 있게 하였습니다.
-   README 예시 코드를 변경하였습니다.
