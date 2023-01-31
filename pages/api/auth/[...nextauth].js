import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher, datafetcher } from "./Apifetcher";
import jwt_decode from "jwt-decode";

let tokenCont;
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (credentials.refresh) {
          const data = await datafetcher(credentials.refresh);
          if (data.access) {
            const decoded = jwt_decode(data.access);
            return {
              email: {
                access: data.access,
                refresh: data.refresh,
                info: decoded,
              },
            };
          } else throw Error("Token invalid");
        }
        const data = await fetcher(credentials.email, credentials.password);
        if (data?.access) {
          const decoded = jwt_decode(data.access);
          return {
            email: {
              access: data.access,
              refresh: data.refresh,
              info: decoded,
            },
          };
        } else throw Error("Password Mismatch");
      },
    }),
  ],
});
