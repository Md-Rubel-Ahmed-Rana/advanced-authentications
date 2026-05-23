import Login from "@/app/auth/login";

import { useGetProfileQuery } from "@/features/auth";
import AppLoader from "@/common/AppLoader";
import PageMetadata from "@/seo/PageMetadata";
import Profile from "@/profile";
import { IUser } from "@/types/user.type";
import { ReactElement } from "react";
import RootLayout from "@/layout";

const HomePage = () => {
  const { data, isLoading } = useGetProfileQuery({});

  const user = data?.data?.user as IUser;

  if (isLoading) {
    return <AppLoader />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <PageMetadata title={user.id ? "Profile" : "Login"} />
      <Profile />
    </>
  );
};

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="10000px">{page}</RootLayout>;
};

export default HomePage;
