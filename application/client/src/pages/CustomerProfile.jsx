import React, { useState } from 'react';

export default function CustomerProfile() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    } else {
      setProfilePhoto(null);
    }
  };

  return (
    <div className="bg-white sm:mx-4 md:mx-8 lg:mx-16 xl:mx-32">
      <div className="w-1/2 max-w-lg mx-auto mt-4 px-4">
        <form className="mx-2 my-2">
          <div className="bg-slate-300 rounded-lg p-4"> 
		  <h1 className="font-medium text-2 pt-5 px-2">User Profile</h1>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="md:w-1/2 mt-5">
                {profilePhoto && (
                  <img className="h-20 w-20 object-cover rounded-full" src={profilePhoto} alt="User Profile"/>
                )}
                <label className="block mt-3">
                  <input
                    type="file"
                    className="w-full text-sm border border-black rounded p-2 text-zinc-900"
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>

              <div className="md:w-1/2 mt-5">
                <label className="inline-flex items-baseline border border-black rounded p-2">
                  <div className="flex-1 leading-none">
                    <input
                      type="text"
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Idea"
                    />
                  </div>
                </label>

                <label className="inline-flex items-baseline border border-black rounded p-2 mt-2">
                  <div className="flex-1 leading-none">
                    <input
                      type="text"
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Name"
                    />
                  </div>
                </label>

                <label className="inline-flex items-baseline border border-black rounded p-2 mt-2">
                  <div className="flex-1 leading-none">
                    <input
                      type="text"
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Email"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-2">
              <label className="relative block p-2 border border-black rounded">
                <span className="text-md font-semibold text-zinc-900">Bio</span>
                <textarea
                  className="w-full p-2 text-sm border-2 border-black rounded text-black"
                  placeholder="Write your Bio...."
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
