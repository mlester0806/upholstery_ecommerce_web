import React, { useState } from "react";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { Order } from "@/models/Order";
import Modal from "../Modal";
import { useUpdateOrderMutation } from "@/services/crud-order";
import toast from "react-hot-toast";

type SellerOrdersMainProps = {
  orders: Order[];
};

const SellerOrdersMain: React.FC<SellerOrdersMainProps> = ({ orders }) => {
  // State to store only the status of orders
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const [pendingOrderDetails, setPendingOrderDetails] = useState({});
  const [showPackedStatus, setShowPackedStatus] = useState(false);
  const [showShippedStatus, setShowShippedStatus] = useState(false);
  const [showForDeliveryStatus, setShowForDeliveryStatus] = useState(false);
  const [showDeliveredStatus, setShowDeliveredStatus] = useState(false);

  const runCloseModal = () => {
    setPendingOrderDetails({});
    setShowPackedStatus(false);
    setShowShippedStatus(false);
    setShowForDeliveryStatus(false);
    setShowDeliveredStatus(false);
  };

  const runPackedFunc = () => {
    updateOrder(pendingOrderDetails)
      .unwrap()
      .then((payload) => {
        toast.success("Order Packed Successfully");
      })
      .catch((error) => console.log(error));
  };

  const runShippedFunc = () => {
    updateOrder(pendingOrderDetails)
      .unwrap()
      .then((payload) => {
        toast.success("Order Shipped Successfully");
      })
      .catch((error) => console.log(error));
  };

  const runForDeliveryFunc = () => {
    updateOrder(pendingOrderDetails)
      .unwrap()
      .then((payload) => {
        toast.success("Order For Delivery Successfully");
      })
      .catch((error) => console.log(error));
  };

  const runDeliveredFunc = () => {
    updateOrder(pendingOrderDetails)
      .unwrap()
      .then((payload) => {
        toast.success("Order Delivered Successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Modal
        title={`Are you sure that this order is already packed?`}
        description={`Please double check it first because this action is irreversible.`}
        status="failed"
        open={showPackedStatus}
        leftBtnTitle="Back"
        rightBtnTitle="Continue"
        closeModal={runCloseModal}
        leftBtnFunc={runCloseModal}
        rightBtnFunc={runPackedFunc}
      />

      <Modal
        title={`Are you sure that this order is already shipped?`}
        description={`Please double check it first because this action is irreversible.`}
        status="failed"
        open={showShippedStatus}
        leftBtnTitle="Back"
        rightBtnTitle="Continue"
        closeModal={runCloseModal}
        leftBtnFunc={runCloseModal}
        rightBtnFunc={runShippedFunc}
      />

      <Modal
        title={`Are you sure that this order is already for delivery?`}
        description={`Please double check it first because this action is irreversible.`}
        status="failed"
        open={showForDeliveryStatus}
        leftBtnTitle="Back"
        rightBtnTitle="Continue"
        closeModal={runCloseModal}
        leftBtnFunc={runCloseModal}
        rightBtnFunc={runForDeliveryFunc}
      />

      <Modal
        title={`Are you sure that this order is already delivered?`}
        description={`Please double check it first because this action is irreversible.`}
        status="failed"
        open={showDeliveredStatus}
        leftBtnTitle="Back"
        rightBtnTitle="Continue"
        closeModal={runCloseModal}
        leftBtnFunc={runCloseModal}
        rightBtnFunc={runDeliveredFunc}
      />

      <div className="xl:pl-72 bg-gray-100">
        <main>
          <header className="flex items-center justify-between border-b border-gray-500 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div className="flex items-center text-base  leading-7 text-gray-900">
              <span>
                <HomeIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="ml-2 text-gray-400">Home</span>

              <span>
                <ChevronRightIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="text-gray-400">Transactions</span>

              <span>
                <ChevronRightIcon
                  className="h-5 w-5 shrink-0 text-gray-900"
                  aria-hidden="true"
                />
              </span>

              <span className="font-semibold">My Orders</span>
            </div>
          </header>

          {/* Orders List */}
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Orders
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the orders in your seller centre account.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flow-root bg-white overflow-hidden">
              <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Order ID
                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Customer's Name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Products's Name
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Subtotal Price
                      </th>

                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Shipping Fee
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Total Price
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Total Quantity
                      </th>

                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Payment Method
                      </th>

                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Status
                      </th>

                      {/* <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th> */}

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Action<span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell"
                        >
                          No Orders Found...
                        </td>
                      </tr>
                    )}

                    {orders?.map((order, index) => {
                      const createdDate = new Date(order.created_at);
                      const createdAt = format(createdDate, "yyyy-MM-dd");
                      let totalPrice = order.price;
                      let totalShippingFee;

                      if (Boolean(order.shipping_discount)) {
                        if (Boolean(order.discount_mode === "Percentage")) {
                          const shippingDiscount =
                            order.shipping_discount / 100;
                          const shippingFee =
                            order.shipping_fee -
                            order.shipping_fee * shippingDiscount;

                          if (shippingFee) {
                            totalShippingFee += shippingFee / 1;
                            totalPrice += shippingFee / 1;
                          } else {
                            totalShippingFee = 0;
                          }
                        }
                      } else {
                        totalShippingFee = 39;
                        totalPrice += totalShippingFee;
                      }

                      return (
                        <tr key={index}>
                          <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                            {order.order_id}
                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {order.customer.first_name}{" "}
                            {order.customer.last_name}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {order.name}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            ₱
                            {order.price.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className="px-3 py-4 text-sm text-gray-500">
                            ₱
                            {totalShippingFee.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className="px-3 py-4 text-sm text-gray-500">
                            ₱
                            {totalPrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className="px-3 py-4 text-sm text-gray-500">
                            {order.quantity ?? 0} item(s)
                          </td>

                          {/* <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.voucher_code ?? 'N/A'}
                          </td>

                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.discount_mode === 'Price' &&
                              order.price_discount &&
                              '₱'}
                            {order.price_discount ?? 0}
                            {order.discount_mode === 'Percentage' &&
                              order.price_discount &&
                              '%'}
                          </td>

                          <td className='hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                            {order.discount_mode === 'Price' &&
                              order.shipping_discount &&
                              '₱'}
                            {order.shipping_discount ?? 0}
                            {order.discount_mode === 'Percentage' &&
                              order.shipping_discount &&
                              '%'}
                          </td> */}

                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {order.payment_method}
                          </td>

                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {order.status === "Processing" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-gray-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {order.status}
                              </span>
                            )}

                            {order.status === "Cancelled" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-red-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {order.status}
                              </span>
                            )}

                            {order.status === "Packed" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-yellow-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {order.status}
                              </span>
                            )}

                            {order.status === "Shipped" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-orange-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {order.status}
                              </span>
                            )}

                            {order.status === "Out For Delivery" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-indigo-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {order.status}
                              </span>
                            )}

                            {order.status === "Delivered" && (
                              <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
                                <svg
                                  className="h-1.5 w-1.5 fill-green-500"
                                  viewBox="0 0 6 6"
                                  aria-hidden="true"
                                >
                                  <circle cx={3} cy={3} r={3} />
                                </svg>
                                {order.status}
                              </span>
                            )}
                          </td>
                          {/* <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {createdAt}
                          </td> */}

                          <td className="relative py-4 text-center text-sm font-medium space-y-4">
                            <div className="flex">
                              <button
                                onClick={() => {
                                  setPendingOrderDetails({
                                    id: order.id,
                                    purpose: "Seller Packed",
                                    customer_id: order.customer.id,
                                    product_id: order.product_id,
                                    status: "Packed",
                                  });
                                  setShowPackedStatus(true);
                                }}
                                disabled={order.status !== "Processing"}
                                className="text-white bg-gray-600 hover:bg-gray-700 p-2 rounded-lg mx-2 disabled:bg-gray-200"
                              >
                                Packed
                              </button>

                              <button
                                onClick={() => {
                                  setPendingOrderDetails({
                                    id: order.id,
                                    purpose: "Seller Shipped",
                                    customer_id: order.customer.id,
                                    product_id: order.product_id,
                                    status: "Shipped",
                                  });
                                  setShowShippedStatus(true);
                                }}
                                disabled={order.status !== "Packed"}
                                className="text-white bg-yellow-600 hover:bg-yellow-700 p-2 rounded-lg mx-2 disabled:bg-yellow-200"
                              >
                                Shipped
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                onClick={() => {
                                  setPendingOrderDetails({
                                    id: order.id,
                                    purpose: "Seller For Delivery",
                                    customer_id: order.customer.id,
                                    product_id: order.product_id,
                                    status: "Out For Delivery",
                                  });
                                  setShowForDeliveryStatus(true);
                                }}
                                disabled={order.status !== "Shipped"}
                                className="text-white w-max bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mx-2 disabled:bg-blue-200"
                              >
                                For Delivery
                              </button>

                              <button
                                onClick={() => {
                                  setPendingOrderDetails({
                                    id: order.id,
                                    purpose: "Seller Delivered",
                                    customer_id: order.customer.id,
                                    product_id: order.product_id,
                                    status: "Delivered",
                                  });
                                  setShowDeliveredStatus(true);
                                }}
                                disabled={order.status !== "Out For Delivery"}
                                className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-lg mx-2 disabled:bg-green-200"
                              >
                                Delivered
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SellerOrdersMain;
