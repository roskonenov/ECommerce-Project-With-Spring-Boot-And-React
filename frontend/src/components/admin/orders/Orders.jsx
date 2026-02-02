import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';

const Orders = () => {
  const adminOrders = [ { "id":11, "email":"user@example.com", "orderItems":[ { "id":16, "product":{ "id":22, "name":"Philips 5000 Coffee Machine", "image":"https://i.ibb.co/VWfh6QLy/Philips-5000-Coffee-Machine.jpg", "description":"Automatic espresso machine with milk frother.", "quantity":24, "price":1250.0, "discount":8.0, "specialPrice":1150.0 }, "quantity":1, "discount":8.0, "orderedProductPrice":1150.0 }, { "id":17, "product":{ "id":26, "name":"Xbox Series X", "image":"https://i.ibb.co/Hp1sSSZ6/Xbox-Series-X.jpg", "description":"Powerful gaming console with 4K performance capabilities.", "quantity":27, "price":1050.0, "discount":7.0, "specialPrice":976.5 }, "quantity":1, "discount":7.0, "orderedProductPrice":976.5 } ], "orderDate":"2025-12-19", "payment":{ "id":11, "paymentMethod":"online", "pgPaymentId":"pi_3Sg92NLgLyBJuCDK1Yt32vtR", "pgStatus":"succeeded", "pgResponseMessage":"Payment successful", "pgName":"Stripe" }, "totalAmount":2126.5, "status":"Order accepted!", "addressId":10 }, { "id":12, "email":"admin@example.com", "orderItems":[ { "id":18, "product":{ "id":8, "name":"JBL Bar 500", "image":"https://i.ibb.co/MkSS7TS2/JBL-Bar-500.jpg", "description":"Powerful soundbar with deep bass and multi-beam technology.", "quantity":38, "price":450.0, "discount":10.0, "specialPrice":405.0 }, "quantity":1, "discount":10.0, "orderedProductPrice":405.0 } ], "orderDate":"2025-12-22", "payment":{ "id":12, "paymentMethod":"online", "pgPaymentId":"pi_3ShDMbLgLyBJuCDK03idoiAd", "pgStatus":"succeeded", "pgResponseMessage":"Payment successful", "pgName":"Stripe" }, "totalAmount":405.0, "status":"Order accepted!", "addressId":22 }, { "id":13, "email":"user@example.com", "orderItems":[ { "id":19, "product":{ "id":3, "name":"Iphone Xs max", "image":"https://i.ibb.co/5XhWjGg9/Iphone-Xs-max.webp", "description":"Experience the latest in mobile technology with advanced cameras, powerful processing, and an all-day battery.", "quantity":30, "price":1450.0, "discount":10.0, "specialPrice":1305.0 }, "quantity":0, "discount":10.0, "orderedProductPrice":1305.0 } ], "orderDate":"2026-01-23", "payment":{ "id":13, "paymentMethod":"online", "pgPaymentId":"pi_3SsoV6LgLyBJuCDK3v7NJGE4", "pgStatus":"succeeded", "pgResponseMessage":"Payment successful", "pgName":"Stripe" }, "totalAmount":2610.0, "status":"Order accepted!", "addressId":1 } ];

  const pagination = {"pageNumber": 0, "pageSize": 12, "totalElements": 3, "totalPages": 1, "lastPage": true};
  const noOrders = !adminOrders || adminOrders.length === 0;

  return (
    <div>
      {noOrders ? (
        <div className='flex flex-col justify-center items-center mt-8 mb-20 text-gray-600'>
          <FaShoppingCart size={50} />
          <h1 className='font-semibold text-3xl text-slate-700 py-6'>
            No Orders Placed Yet!
          </h1>
        </div>
      ) : (
        <div>
          <h1 className='font-semibold text-3xl text-slate-700 py-6 text-center'>
            All Orders
          </h1>
          <div>
            <OrderTable adminOrders={adminOrders} pagination={pagination} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders