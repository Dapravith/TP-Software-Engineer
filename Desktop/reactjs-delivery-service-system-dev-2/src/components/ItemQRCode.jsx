import React from "react";
import QRCode from 'qrcode.react';

function ItemQRCode({qrText}) {
    return <div>
        <QRCode value={qrText} />
    </div>
}

export default ItemQRCode;

