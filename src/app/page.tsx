"use client";

import Payment from "@/app/page/payement";

export default function Home() {

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <main className="flex gap-8 w-full justify-center items-center">
                <Payment />
            </main>
        </div>
    );
}



//
// useEffect(() => {
//     const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
//     if (!clientKey) {
//         console.error("Midtrans client key is missing.");
//         return;
//     }
//
//     const script = document.createElement("script");
//     script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // Use production URL in production mode
//     script.setAttribute("data-client-key", clientKey);
//     script.async = true;
//     document.body.appendChild(script);
//
//     return () => {
//         document.body.removeChild(script); // Cleanup on unmount
//     };
// }, []);
