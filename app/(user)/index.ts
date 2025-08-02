import { isAuthenticated } from "@/lib/auth/auth";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
        initialAuthStatus: isAuthenticated(context),
    },
  };
}
