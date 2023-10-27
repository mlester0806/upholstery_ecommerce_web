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
import SellerProductsMain from '@/components/seller-dashboard/SellerProductsMain';
import { useGetProductsQuery } from '@/services/crud-product';

const SellerMyProductsPage = () => {
  const { data: user, isError } = useCustomerGetUserQuery();
  const { data: seller, isFetching: sellerFetching } = useSellerGetUserQuery();
  const { data: products, isFetching: productsFetching } =
    useGetProductsQuery();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const sellerProducts = useMemo(() => {
    if (products && seller) {
      return products.filter((el) => el.shop.seller.id === seller.id);
    }

    return [];
  }, [seller, products]);

  useEffect(() => {
    const isAuthenticatedCookie = Cookies.get('is_authenticated');

    if (!isAuthenticatedCookie) {
      router.push('/seller/login');
    }

    if (user && isAuthenticatedCookie) {
      router.push('/seller/login');
    }
    setIsLoading(false);

    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, []);

  if (isLoading || sellerFetching || productsFetching) {
    return <div className='flex h-full flex-1 bg-white'></div>;
  }

  return (
    <SellerDashboard>
      <SellerProductsMain products={sellerProducts} />
    </SellerDashboard>
  );
};

export default SellerMyProductsPage;
