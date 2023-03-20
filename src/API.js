export const getAllOrders = (v) => {
  const url = `https://script.google.com/macros/s/AKfycbyhR-ORMF-h0qOTm8WyrmxgLCfGrVXJ7y-OLD8JL3oZNFB5ASv4x3CJT_Ckxkv5ajcW/exec?action=getOrderItemDetails&order_id=${v}`;

  return fetch(url, { method: 'GET' })
    .then(response => {      
      return response.json();
    })
  };
  
  export const getOrderByDeliveryReference = (v) => {    
    return getAllOrders(v.toUpperCase()).then((orders) => {
      global.orderData = orders;
      console.log(global.orderData)
      console.log(v.toUpperCase())
    return orders.find((order) => order['UNIQUE DELVIERY REFERENCE'] === v.toUpperCase());
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
    return response.json();
  });
};

export const updateDayDelivery = (deliveryReference, dayDelivery) => {
  const url = `https://script.google.com/macros/s/AKfycbyhR-ORMF-h0qOTm8WyrmxgLCfGrVXJ7y-OLD8JL3oZNFB5ASv4x3CJT_Ckxkv5ajcW/exec?action=deliveryDateBooking&order_id=${deliveryReference}&date=${dayDelivery}`;

  return fetch(url, { method: 'GET' })
    .then(response => {      
      return response.json();
    })
    .then(orderData => {
      global.orderData = orderData;
      // console.log(orderData)
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

    return global.orderData[0]['available_delivery_dates'];
  });
};
