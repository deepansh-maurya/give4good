document.querySelector("#rzp-button1").addEventListener("click", payment);

async function payment() {
  let key = await fetch("http://localhost:3000/api/v1/get-payment-key");
  key = await key.json();
  console.log(key);
  const amount = "5000";
  const campaignID = "660f76e6e604f022d3c5758e";
  const id = "660ece1b49b080c09c752b5f";
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
    key: key, // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Give4Good",
    description: "Test Transaction",
    image: "https://avatars.githubusercontent.com/u/147298285?s=96&v=4",
    order_id: order.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
