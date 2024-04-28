import React from "react";

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen bg-black text-white">
        {/* Background image */}
        <img
          src="https://img.freepik.com/premium-photo/poor-sad-indian-family-flooded-polluted-street-high-quality-photo_409674-2835.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Text on the left side */}
        <div className="absolute bg-gradient-to-r from-black to-transparent text-white left-0 inset-y-0 flex  items-center justify-center w-1/2">
          <div className="p-8">
            <h1 className="  text-7xl font-bold mb-4">
              Convert Cliks <br /> into Donations
            </h1>

            <button className="bg-white text-black py-2 px-4 rounded-full font-medium">
              Donate Now
            </button>
          </div>
        </div>
        {/* Overlay text */}
      </div>
      <div className="min-h-screen bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl font-bold text-center mb-12">
            How to start a fundraising campaign on Give4Good
          </h1>
          <div className="flex items-center space-x-8">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute bg-white w-16 h-16 rounded-full flex items-center justify-center text-black text-3xl font-bold">
                1
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Setup a Free crowdfunding campaign
              </h3>
              <p className="text-lg">
                Fill in a few details about yourself, and who you are
                fundraising for.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-8 mt-12">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute bg-white w-16 h-16 rounded-full flex items-center justify-center text-black text-3xl font-bold">
                2
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Share the campaign</h3>
              <p className="text-lg">
                Share your campaign with friends, family via WhatsApp, poster,
                FB share, etc.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-8 mt-12">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute bg-white w-16 h-16 rounded-full flex items-center justify-center text-black text-3xl font-bold">
                3
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Receive Donations</h3>
              <p className="text-lg">
                Receive donations from friends, family and even strangers across
                the world.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-8 mt-12">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute bg-white w-16 h-16 rounded-full flex items-center justify-center text-black text-3xl font-bold">
                4
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Withdraw funds from the campaign
              </h3>
              <p className="text-lg">
                Transfer funds to the hospital or to your bank account, whenever
                you need.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Causes you can raise funds for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                <img
                  src="/medical-icon.svg"
                  alt="Medical"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-lg font-semibold">MEDICAL</h3>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                <img
                  src="/memorial-icon.svg"
                  alt="Memorial"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-lg font-semibold">MEMORIAL</h3>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                <img
                  src="/children-icon.svg"
                  alt="Children"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-lg font-semibold">CHILDREN</h3>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                <img
                  src="/education-icon.svg"
                  alt="Education"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-lg font-semibold">EDUCATION</h3>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                <img
                  src="/animal-icon.svg"
                  alt="Animal"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-lg font-semibold">ANIMAL</h3>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                <img
                  src="/others-icon.svg"
                  alt="Others"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-lg font-semibold">OTHERS</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
