import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

// Define a type for the request body to match your expected structure
interface PaymentRequestBody {
    orderId: string;
    amount: number;
    customerDetails: {
        first_name: string;
        email: string;
    };
}

export async function POST(req: Request) {
    const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY || "", // Ensure the server key is defined
    });

    console.log("MIDTRANS_SERVER_KEY:", process.env.MIDTRANS_SERVER_KEY);

    try {
        const body: PaymentRequestBody = await req.json(); // Parse the JSON body
        const { orderId, amount, customerDetails } = body;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount,
            },
            customer_details: customerDetails,
        };

        const transaction = await snap.createTransaction(parameter);

        return NextResponse.json(transaction); // Return the transaction response
    } catch (error: any) {
        console.error("Transaction Error:", error.message || error);
        return NextResponse.json(
            { error: "Failed to create transaction" },
            { status: 500 }
        );
    }
}
