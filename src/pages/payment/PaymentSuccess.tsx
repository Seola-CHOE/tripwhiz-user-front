import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const [responseData,] = useState(null);



    useEffect(() => {
        async function confirm() {
            const requestData = {
                orderId: searchParams.get("orderId"),
                amount: searchParams.get("amount"),
                paymentKey: searchParams.get("paymentKey"),
            };

            try {


                //last- 결제완료, console fail to fetch 에러
                const response = await fetch("http://localhost:4000/api/verify-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                // 응답 처리
                const result = await response.json();
                console.log(result);

                if (!response.ok) {
                    console.error("Payment verification failed:", result);
                } else {
                    console.log("Payment verified successfully:", result);
                }
            } catch (error) {
                console.error("Error during payment confirmation:", error);
            }
        }

        confirm();
    }, []);

    return (
        <>
            <div className="box_section" style={{width: "600px"}}>
                <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"/>
                <h2>결제를 완료했어요</h2>
                <div className="p-grid typography--p" style={{marginTop: "50px"}}>
                    <div className="p-grid-col text--left">
                        <b>결제금액</b>
                    </div>
                    <div className="p-grid-col text--right" id="amount">
                        {`${Number(searchParams.get("amount")).toLocaleString()}원`}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{marginTop: "10px"}}>
                    <div className="p-grid-col text--left">
                        <b>주문번호</b>
                    </div>
                    <div className="p-grid-col text--right" id="orderId">
                        {`${searchParams.get("orderId")}`}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{marginTop: "10px"}}>
                    <div className="p-grid-col text--left">
                        <b>paymentKey</b>
                    </div>
                    <div className="p-grid-col text--right" id="paymentKey"
                         style={{whiteSpace: "initial", width: "250px"}}>
                        {`${searchParams.get("paymentKey")}`}
                    </div>
                </div>
                <div className="p-grid-col">
                    <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
                        <button className="button p-grid-col5">연동 문서</button>
                    </Link>
                    <Link to="https://discord.gg/A4fRFXQhRu">
                        <button className="button p-grid-col5" style={{backgroundColor: "#e8f3ff", color: "#1b64da"}}>
                            실시간 문의
                        </button>
                    </Link>
                </div>
            </div>
            <div className="box_section" style={{width: "600px", textAlign: "left"}}>
                <b>Response Data :</b>
                <div id="response" style={{whiteSpace: "initial"}}>
                    {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
                </div>
            </div>
        </>
    );
}


export default PaymentSuccess;