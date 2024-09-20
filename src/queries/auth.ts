import { gql } from '@apollo/client';

const authDataFragment = gql`
  fragment AuthData on AuthResponse {
    user {
      id
      username
      email
      googleId
      facebookId
    }
    notifications {
      id
      groupName
      emails
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($user: Auth!) {
    registerUser(user: $user) {
      ...AuthData
    }
  }
  ${authDataFragment}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      ...AuthData
    }
  }
  ${authDataFragment}
`;

export const AUTH_SOCIAL_USER = gql`
  mutation AuthSocialUser($user: SocialAuth!) {
    authSocialUser(user: $user) {
      ...AuthData
    }
  }
  ${authDataFragment}
`;
