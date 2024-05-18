import React from 'react';
import Head from '../Components/Head';
import Layout from './../Layout/Layout';

function AboutUs() {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to our Netflixy
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Where endless entertainment awaits! If you're a fan of captivating
                  movies, TV shows, and documentaries, then Netflixy is the perfect
                  streaming platform for you. With Netflixy, you have access to a vast
                  library of content across various genres and languages. From heartwarming
                  romances to gripping thrillers and thought-provoking documentaries,
                  there's something for everyone. Netflixy offers a user-friendly interface,
                  making it easy to explore and discover new titles. You can search for specific
                  movies or shows, receive personalized recommendations, and enjoy high-quality
                  streaming on any device.
                </p>
                <p>
                  From heartwarming
                  romances to gripping thrillers and thought-provoking documentaries,
                  there's something for everyone. Netflixy offers a user-friendly interface,
                  making it easy to explore and discover new titles. You can search for specific
                  movies or shows, receive personalized recommendations, and enjoy high-quality
                  streaming on any device.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">10K</span>
                  <h4 className="text-lg font-semibold my-2">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">8K</span>
                  <h4 className="text-lg font-semibold my-2">Lovely Users</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Completely free, without registration! Lorem Ipsum is simply
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/images/aboutus.jpg"
              alt="aboutus"
              className="w-full xl:block hidden h-header rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
