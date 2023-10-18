import React from 'react';

const UserProfile = () => {
  // Replace this with actual user profile data
  const userProfileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    // Add more profile data as needed
  };

  return (
    <div  className='grid grid-col-3' style={{ color: 'orange' }}>
      {/* <h2 className="text-xl font-semibold mb-4">User Profile</h2> */}

      {/* Profile Image Section */}
      <div className="mb-4">
        {/* <h3 className="text-lg font-semibold mb-2">Profile Image</h3> */}
        <div className="flex items-center">
          {/* Placeholder for the profile image */}
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-2 mr-4" />
          {/* <div>
            <input type="file" accept="image/*" className="mb-2" />
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Upload Image
            </button>
          </div> */}
        </div>
      </div>

      {/* Profile Information */}
      <div>
        <p><strong>Name:</strong> {userProfileData.name}</p>
        <p><strong>Email:</strong> {userProfileData.email}</p>
        {/* Add more profile information here */}
      </div>

      {/* Buttons
      <button className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
        Update Profile
      </button>
      <button className="ml-2 mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
        Change Password
      </button> */}
    </div>
  );
}

export default UserProfile;
