// import crypto from 'crypto';

// const calculateSignature = (data, secretKey) => {
//   try {
//     const hmac = crypto.createHmac('sha256', secretKey);
//     hmac.update(data, 'utf8');

//     const hash = hmac.digest('hex');
//     return hash;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export default calculateSignature;