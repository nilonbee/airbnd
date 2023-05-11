import React from "react";
import PageLayout from "../layout/pageLayout";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Account = () => {
  const { user, ready } = useGlobalContext();

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <PageLayout>
      <div className="flex flex-col h-screen">{`${user?.firstName} ${user?.lastName}`}</div>
    </PageLayout>
  );
};

export default Account;
