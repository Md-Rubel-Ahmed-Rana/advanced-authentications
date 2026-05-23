import TwoFaVerification from "@/app/auth/2fa-verification";
import RootLayout from "@/layout";
import PageMetadata from "@/seo/PageMetadata";
import { ReactElement } from "react";

const TwoFaVerificationPage = () => {
  return (
    <>
      <PageMetadata title="2FA Verification" />
      <TwoFaVerification />
    </>
  );
};

TwoFaVerificationPage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="10000px">{page}</RootLayout>;
};

export default TwoFaVerificationPage;
