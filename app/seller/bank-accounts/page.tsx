"use client";

import { useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import SellerDashboard from "@/components/seller-dashboard/SellerDashboard";
import {
  useCustomerGetUserQuery,
  useSellerGetUserQuery,
} from "@/services/authentication";
import SellerBankAccountsMain from "@/components/seller-dashboard/SellerBankAccountsMain";
import { useGetBankAccountsQuery } from "@/services/crud-bank-account";

const SellerBankAccountsPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: bankAccounts, isFetching: bankAccountsFetching } =
    useGetBankAccountsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const sellerBankAccounts = useMemo(() => {
    if (bankAccounts && seller) {
      return bankAccounts
        .filter((el) => el.seller.id === seller.id)
        .sort((a, b) => b.id - a.id);
    }

    return [];
  }, [seller, bankAccounts]);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get("is_authenticated");

    if (!isAuthenticatedCookie) {
      router.push("/seller/login");
    }

    if (user && isAuthenticatedCookie) {
      router.push("/");
    }

    if (seller && isAuthenticatedCookie) {
      setIsLoading(false);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user, seller]);

  if (isLoading || sellerFetching || bankAccountsFetching) {
    return <div className="flex h-full flex-1 bg-white"></div>;
  }

  return (
    <SellerDashboard>
      <SellerBankAccountsMain bankAccounts={sellerBankAccounts} />
    </SellerDashboard>
  );
};

export default SellerBankAccountsPage;
