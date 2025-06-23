import React from "react";
import SectionContainer from "../SectionContainer";

const Profile = () => {
  return (
    <SectionContainer background="mt-1 h-auto">
      {/* PARENT */}
      <div className="grid grid-cols-12 px-[20px] gap-4">
        {/* SIDEBAR */}
        <div className="col-span-3">
          <div className="bg-highlight1 w-full h-[900px] flex mb-4">
            <p className="text-white font-semibold mt-12">Sidebar</p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-9">
          <div className="bg-white w-full h-[900px] flex flex-col mt-12">
            <div>
              <p className="title-normal">
                Good Morning{" "}
                <span className="title">
                  <em>Joshua!</em>
                </span>{" "}
                Welcome To IIH College.
              </p>
            </div>
            <div className="mt-[72px] relative">
              <div className="absolute top-0 left-0 w-full h-[95px] bg-secondary shadow-md shadow-white z-10 rounded-t-md" />

              <div className="absolute top-[50px] left-[48px] z-20">
                <div className="w-[115px] h-[115px] rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src="/image/josh.svg"
                    alt="josh"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="relative mt-[80px] w-full h-[304px] bg-white shadow-md shadow-text rounded-md z-0 px-6 py-6">
                <div className=" mt-[80px] mb-4">
                  <p className="subtitle">Joshua Colobong Paet</p>
                  <p className="text-sm text-gray-600">
                    Bachelor of Science in Information System
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-[48]">
                  <div className="flex flex-col">
                    <span className="mini-title">Email</span>
                    <span className="text-sm text-gray-600">
                      joshuaexample01@gmail.com
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mini-title">Address</span>
                    <span className="text-sm text-gray-600">
                      Quezon City, Philippines
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mini-title">Contact</span>
                    <span className="text-sm text-gray-600">09974556877</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="mini-title">ID Number</span>
                    <span className="text-sm text-gray-600">22-00048</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Profile;
