import React from "react";
import NextLink from "next/link";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <NextLink href="/home">Protected Page</NextLink>
    </>
  );
};

Home.protected = true;

export default Home;
