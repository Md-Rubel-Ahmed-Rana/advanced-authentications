import Head from "next/head";

const defaultTitle = "Home";

const defaultDescription =
  "Secure authentication platform with Passkeys, Authenticator Apps, Two-Factor Authentication (2FA), Recovery Codes, and passwordless login. Fast, secure, and developer-friendly identity protection for modern applications.";

const defaultKeywords =
  "passkey authentication, authenticator app, 2FA, MFA, passwordless login, WebAuthn, biometric authentication, secure authentication, recovery codes, identity security, developer authentication platform, passkey security";

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
};

const PageMetadata = ({
  title = defaultTitle,
  description = defaultDescription,
  keywords = defaultKeywords,
}: Props) => {
  return (
    <Head>
      <title>{`${title} - SecureAuth`}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta name="author" content="SecureAuth" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={`${title} - SecureAuth`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} - SecureAuth`} />
      <meta name="twitter:description" content={description} />

      {/* Theme */}
      <meta name="theme-color" content="#000000" />
    </Head>
  );
};

export default PageMetadata;
