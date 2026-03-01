export const baseJwt = ({ token, user, account }: any) => {
  if (user) {
    token.id = user.id;
    token.role = user.role;
    token.status = user.status;
    token.provider = account?.provider;
  }
  return token;
};

export const baseSession = ({ session, token }: any) => {
  if (session.user) {
    session.user.id = token.id;
    session.user.role = token.role;
    session.user.provider = token.provider;
    session.user.status = token.status;
  }
  return session;
};
