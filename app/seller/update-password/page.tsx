'use client';

import { useEffect, useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import SellerDashboard from '@/components/seller-dashboard/SellerDashboard';
import {
  useCustomerGetUserQuery,
  useSellerGetUserQuery,
} from '@/services/authentication';
import SellerUpdatePassword from '@/components/seller-dashboard/SellerUpdatePassword';

const SellerUpdatePasswordPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get('is_authenticated');

    if (!isAuthenticatedCookie) {
      router.push('/seller/login');
    }

    if (user && isAuthenticatedCookie) {
      router.push('/');
    }

    if (seller && isAuthenticatedCookie) {
      setIsLoading(false);
    }

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [user, seller]);

  if (isLoading || sellerFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <SellerDashboard>
      <SellerUpdatePassword />
    </SellerDashboard>
  );
};

export default SellerUpdatePasswordPage;
