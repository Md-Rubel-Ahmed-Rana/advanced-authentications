import Register from "@/app/auth/register";
import RootLayout from "@/layout";
import PageMetadata from "@/seo/PageMetadata";
import { ReactElement } from "react";

const SignupPage = () => {
  return (
    <>
      <PageMetadata title="Signup" />
      <Register />
    </>
  );
};

export default SignupPage;

SignupPage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="10000px">{page}</RootLayout>;
};
