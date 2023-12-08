// import axios from 'axios';

// const execPostRequest = async (url, data) => {


//   try {
//     const response = await axios.post(url, data, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': data.length.toString(),
//       },
//       timeout: 5000,
//       timeoutErrorMessage: 'Request timeout',
//     });
//     return response.data;
//   } catch (error) {
//     // Xử lý lỗi ở đây nếu có
//     console.error('Error:', error);
//     return null;
//   }
// };

// export default execPostRequest;



// const endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';
// const partnerCode = 'MOMOBKUN20180529';
// const accessKey = 'klm05TvNBzhg7h7j';
// const secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
// const orderInfo = 'Thanh toán qua MoMo';
// const amount = '10000';
// const orderId = Math.floor(Math.random() * 100000);
// const redirectUrl = '';
// const ipnUrl = '';
// const extraData = '';



// const data = {
//   partnerCode: partnerCode,
//   accessKey: accessKey,
//   requestType: 'captureMoMoWallet',
//   notifyUrl: ipnUrl,
//   returnUrl: redirectUrl,
//   orderId: orderId,
//   amount:amount,
//   orderInfo: orderInfo,
//   extraData: extraData,
// };

// execPostRequest(endpoint, data)
//   .then((response) => {
//     console.log('Response:', response);
//     // Xử lý dữ liệu nhận được từ MOMO tại đây
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//     // Xử lý lỗi nếu có
//   });