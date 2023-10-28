import { defaultAxios, privateAxios } from '.';
import { IReqLogin, IResLogin, IReqSignup, IResSignup, IResAccessToken } from 'types';

const PREFIX_URL = '/auth';

/**
 * 로그인
 * 유저 로그인
 * accessToken과 유저 id 반환 받으며 refreshToken은 쿠키로 설정됨
 * @route POST /auth/login
 * @email email
 * @password password
 * @access public
 */

const login = async (data: IReqLogin) => {
  // console.log("login api", data);
  try {
    const response = await defaultAxios.post(`${PREFIX_URL}/login`, data);
    // console.log("login api response", response);
    const { id, accessToken }: IResLogin = response.data;
    privateAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return { id, accessToken };
  } catch (err) {
    return err;
  }
};

/**
 * 회원 가입
 * 새로운 유저 회원가입
 * @route POST /auth/signup
 * @username 유저 이름
 * @email 이메일
 * @password 비밀번호
 * @openAI openai 키
 * @access public
 */

const signup = async (data: IReqSignup) => {
  try {
    const response: IResSignup = await defaultAxios.post(`${PREFIX_URL}/signup`, data);
    // console.log("login api response", response);
    // const { id, accessToken } = response.data;
    // privateAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * accessToken 재발급 받기
 * @route POST /auth/accessToken
 * @cookies refreshToken
 * @access Private
 */

const accessToken = async () => {
  try {
    const response = await privateAxios.get(`${PREFIX_URL}/accessToken`);
    const { id, accessToken }: IResAccessToken = response.data;
    // 재발급된 AccessToken을 Bearer 인증 헤더로 설정
    privateAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return { id, accessToken };
  } catch (err) {
    return err;
  }
};

/**
 * refreshToken 재발급 받기
 * @route POST /auth/refreshToken
 * @cookies refreshToken
 * @access Private
 */

const refreshToken = async () => {
  try {
    const response = await privateAxios.get(`${PREFIX_URL}/refreshToken`);
    const { id, accessToken }: IResAccessToken = response.data;
    // 재발급된 AccessToken을 Bearer 인증 헤더로 설정
    privateAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return { id, accessToken };
  } catch (err) {
    return err;
  }
};

/**
 * logoutAll delete All RefreshToken related to user
 * @route POST /auth/accessToken
 * @cookies refreshToken
 * @access Private
 */
const logoutAll = async () => {
  try {
    const response = await privateAxios.post(`${PREFIX_URL}/logoutAll`);
    console.log('loginAll API response: ', response);
  } catch (err) {
    return err;
  }
};

export { login, signup, accessToken, refreshToken, logoutAll };