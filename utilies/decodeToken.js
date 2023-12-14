// const jwt = require("jsonwebtoken");
// export const decodeToken = (token) => {
//     // var base64Url = token.split('.')[1];
//     // var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
//     //     return '%' + ('00' + c.charAt(0).toString(16).slice(-2));

//     // }).join(''));
//     // console.log(JSON.parse(base64));
//     const decoded = jwt.decode(token)
//     console.log(decoded);
//     return decoded;
// }

import React, { useEffect } from 'react';
import sha256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

const decodeToken = ({ token }) => {
    useEffect(() => {
        const verifyToken = () => {
            // Decode the base64-encoded token
            const decodedToken = atob(token);

            // Perform some hashing (SHA-256) for verification
            const computedHash = sha256(decodedToken).toString(Hex);

            // Compare the computed hash with a pre-defined hash (this is not secure)
            const predefinedHash = 'predefinedhashvalue';

            if (computedHash === predefinedHash) {
                console.log('Token is valid. Decoded data:', decodedToken);
            } else {
                console.log('Token is not valid.');
            }
        };

        verifyToken();
    }, [token]);

    return <div>Verifying Token...</div>;
};

export default decodeToken;