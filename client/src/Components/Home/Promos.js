import React from 'react';
import { FiUser } from 'react-icons/fi';

function Promos() {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            Download Your Movies Watch Offline. <br />
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Join the Netflix community today by visiting www.netflixy.com
            and choose a subscription plan that suits you best. Get ready
            to embark on a journey of limitless entertainment. Welcome to Netflixy!
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded font-bold">
              HD 4K
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold">
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <div>
          <img
            src="/images/HD.jpg"
            alt="Mobile app"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Promos;
