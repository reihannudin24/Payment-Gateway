"use client"; // Mark as a Client Component

import axios from "axios";

export default function Payment() {

    const cart = [
        {
            "key" : 1,
            "id" : 1,
            "name"  : "Sepatu",
            "price" : 2000,
            "quantity" : 2
        }, {
            "key" : 2,
            "id" : 2,
            "name"  : "Baju",
            "price" : 2000,
            "quantity" : 2
        }
    ]

    const data =  cart.map((item) => {
        return {
            id : item.id,
            name : item.name,
            image : item.image,
            price : parseInt(item?.price)  * 16000,
            quantity : item.quantity,
        }
    })

    console.log(data);

    const handleCheckout = async () => {
        const response = await axios.post("/api/payment" , data)
            .then((res) => {
                return res.data.token;
            })
            .catch((error) => {
                console.log(error);
            })
        window.snap.pay(response)
    }

    return (
        <div className="shadow-lg w-11/12 mx-auto py-4 max-w-lg my-auto border-gray-200 rounded-xl">
            <div className="w-11/12 mx-auto">
                <div className={"w-full mx-auto"}>
                    <div className={"pb-3"}>
                        <div className={""}>
                            <div className={"flex pb-3 gap-3"}>
                                <div className={""}>
                                    <h2 className={"text-lg font-semibold text-gray-600"}>Order Id :  </h2>
                                </div>
                                <div className={""}>
                                    <h2 className={"text-lg font-semibold text-blue-600"}>3883693 </h2>
                                </div>
                            </div>
                        </div>
                        <div className={"border-b border-gray-200"}>
                            <div className={"flex pb-3 gap-3"}>
                                <div className={""}>
                                    <h2 className={"text-lg font-semibold text-gray-600"}>Total Amount :  </h2>
                                </div>
                                <div className={""}>
                                    <h2 className={"text-lg font-semibold text-blue-600"}>60.0000 </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={"w-full"}>
                            <button onClick={handleCheckout} className={"bg-blue-700  hover:bg-blue-800 text-white text-md font-semibold py-2 px-3 rounded-xl"}>
                                Bayar Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}





// const handlePayment = async () => {
//     try {
//         const response = await axios.post("/api/charge", {
//             orderId: `order-${new Date().getTime()}`, // Ensure unique order ID
//             amount: 1000,
//             customerDetails: {
//                 first_name: "Andrian",
//                 email: "andrian@example.com",
//             },
//         });
//
//         console.log(response);
//
//         const { token } = response.data;
//
//         // Ensure the Snap script is loaded
//         if (typeof window.snap === "undefined") {
//             console.error("Midtrans Snap is not loaded.");
//             alert("Payment system is not ready. Please try again later.");
//             return;
//         }
//
//         // Trigger Snap payment flow
//         window.snap.pay(token, {
//             onSuccess: (result) => {
//                 console.log("Success:", result);
//                 alert("Payment Successful!");
//             },
//             onPending: (result) => {
//                 console.log("Pending:", result);
//                 alert("Payment is Pending.");
//             },
//             onError: (result) => {
//                 console.error("Error:", result);
//                 alert("Payment Failed.");
//             },
//             onClose: () => {
//                 console.log("Payment popup closed by the user.");
//                 alert("Payment was not completed.");
//             },
//         });
//     } catch (error) {
//
//         console.error("Full Error:", error);
//         console.error("Transaction Error:", error.message || error);
//
//         console.error("Payment failed:", error.response?.data || error.message);
//         alert("Failed to initiate payment. Please try again.");
//     }
// };
