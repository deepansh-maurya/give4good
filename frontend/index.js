document.querySelector("#rzp-button1").addEventListener("click", payment);

async function payment() {
  console.log("aaye ");
  let key = await fetch("http://localhost:3000/api/v1/get-payment-key");
  key = await key.json();
  console.log(key);
  const amount = "50000";
  const campaignID = "661f83d2064e9fa2c77874bc";
  const id = "661e5367d79b469a29a53814";
  console.log(campaignID, "  ", id);
  const response = await fetch("http://localhost:3000/api/v1/create-order", {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },

    cache: "no-cache",
    body: JSON.stringify({
      details: {
        amount: amount,
        id: id,
        campaignID: campaignID,
      },
    }),
  });
  const order = await response.json();
  console.log(order);

  var options = {
    key: key,
    amount: "50000",
    currency: "INR",
    name: "Give4Good",
    description: "Test Transaction",
    image: "https://avatars.githubusercontent.com/u/147298285?s=96&v=4",
    order_id: order.order.id,
    callback_url: `http://localhost:3000/api/v1/payment-verification/${id}/${campaignID}`,
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9000090000",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var razor = new window.Razorpay(options);
  razor.open();
}
