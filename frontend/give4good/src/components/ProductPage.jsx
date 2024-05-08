import React from "react";

function ProductPage() {
  return (
    <div className="flex justify-center items-start bg-gray-900 text-white min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 p-8">
        <h1 className="text-2xl font-bold mb-4">Donation Title</h1>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-1/2 mr-4">
              <div className="h-6 bg-gray-600 rounded-full">
                {/* Bar representing chances of the needy */}
              </div>
            </div>
            <div className="w-1/2">
              <p>Chances of the needy to get the good</p>
            </div>
          </div>
          <p className="mb-4">Description of the donation</p>
          {/* Image */}
          <img
            src="product_image.jpg"
            alt="Product"
            className="w-full mb-4 rounded-lg"
          />
          <p>Reason for the donation</p>
          {/* Video */}
          <video
            src="product_video.mp4"
            controls
            className="w-full mb-4 rounded-lg"
          ></video>
          {/* Info about the product */}
          <div className="border-t border-gray-600 pt-4">
            <h2 className="text-lg font-bold mb-2">Product Information</h2>
            <p>Brand: XYZ</p>
            <p>Original Price: $100</p>
            <p>Weight: 10 kg</p>
            <p>Dimensions: 10" x 10" x 10"</p>
            <p>Condition: New</p>
            <p>Quantity: 1</p>
            <p>Bought Date: January 1, 2024</p>
            <p>Expiry Date: N/A</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-bold mb-4">Request Form</h2>
        <form className="mb-4">
          <input
            type="text"
            placeholder="Proposal Title"
            className="w-full border border-gray-600 rounded px-4 py-2 mb-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border border-gray-600 rounded px-4 py-2 mb-2"
          />
          <input
            type="text"
            placeholder="Video URL"
            className="w-full border border-gray-600 rounded px-4 py-2 mb-2"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
        <div>
          <button className="bg-gray-600 text-white px-4 py-2 rounded mr-4">
            Share
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded">
            Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
