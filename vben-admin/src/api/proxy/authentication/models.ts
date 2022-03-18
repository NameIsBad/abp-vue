
export interface AuthenticateResultModel {
  accessToken?: string;
  expireIn: number;
  tokenType?: string;
}

export interface UserLoginInfoDto {
  userName: string;
  password: string;
}
