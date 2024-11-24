import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import _ from "lodash";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export async function POST(req) {
    const data = await req.json();
    if (data.length === 0) {
        throw new Error("Data not found");
    }

    const itemDetails = data.map((item) => {
        return {
            key: item?.id,
            id: item?.id,
            name: item?.name,
            price: _.round(parseFloat(item?.price.toString()), 2), // Rounded to 2 decimal places
            quantity: item?.quantity,
        };
    });

    const grossAmount = _.sumBy(itemDetails, (item) => item?.price * item?.quantity);

    const parameter = {
        item_details: itemDetails, // No need to wrap it in an array
        transaction_details: {
            order_id: _.random(100000, 999999), // Corrected random range
            gross_amount: grossAmount,
        },
    };

    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json({
        token,
    });
}
