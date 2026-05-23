import Login from "@/app/auth/login";
import RootLayout from "@/layout";
import PageMetadata from "@/seo/PageMetadata";
import { ReactElement } from "react";

const LoginPage = () => {
  return (
    <>
      <PageMetadata title="Login" />
      <Login />
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="10000px">{page}</RootLayout>;
};
