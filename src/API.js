export const getAllOrders = (v) => {
  const url = `https://script.google.com/macros/s/AKfycbwg3Zxw0wwjTjgRe0CJq5Xk8wehfmHEBnTcmvKaFiXgq4WBHuDwUk_vqqexULhhkO8aBg/exec?action=getOrderItemDetails&order_id=${v}`;

  return fetch(url, { method: 'GET' })
    .then(response => {      
      return response.json();
    })
  };
  
  export const getOrderByDeliveryReference = (v) => {    
    return getAllOrders(v.toUpperCase()).then((orders) => {
      global.orderData = orders;
      console.log(global.orderData)
    return orders.find((order) => order['Unique Ref'] === v.toUpperCase());
  });
};

export const getDeliveryAvailabilities = () => {
  return fetch(
    'https://sheet.best/api/sheets/b501f9c7-0b6c-4d8d-bfde-a953e55a7c64',
    {
      method: 'GET',
    }
  ).then((response) => {
    // console.log(response)
    // console.log(response.json())
    return response.json();
  });
};

export const updateDayDelivery = (deliveryReference, dayDelivery, premium) => {
  console.log(deliveryReference)
  console.log(dayDelivery)
  const url = `https://script.google.com/macros/s/AKfycbwg3Zxw0wwjTjgRe0CJq5Xk8wehfmHEBnTcmvKaFiXgq4WBHuDwUk_vqqexULhhkO8aBg/exec?action=deliveryDateBooking&order_id=${deliveryReference}&date=${dayDelivery}&premium=${premium}`;

  return fetch(url, { method: 'GET' })
    .then(response => {      
      return response.json();
    })
    .then(orderData => {
      global.orderData = orderData;
      console.log(orderData)
      return orderData;
    });
};

export const getDayAvailabilityForPostcode = (postcode) => {
  return getDeliveryAvailabilities().then((availabilities) => {
    // let result = {};
    // // console.log(availabilities)
    // availabilities.forEach((row) => {
    //   result[row['Date (DD/MM/YY)']] = row[postcode] === 'TRUE';
    // });
    // console.log(global.orderData[0]['available_delivery_dates'])
    return global.orderData[0]['available_delivery_dates'];
  });
};
