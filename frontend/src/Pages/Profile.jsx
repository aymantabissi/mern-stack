
const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">Manage My Account</h2>
        <ul className="space-y-3">
          <li className="text-red-500 font-medium cursor-pointer">My Profile</li>
          <li className="text-gray-600 cursor-pointer hover:text-red-500">Address Book</li>
          <li className="text-gray-600 cursor-pointer hover:text-red-500">My Payment Options</li>
        </ul>
        <h2 className="text-gray-800 text-lg font-semibold mt-6 mb-4">My Orders</h2>
        <ul className="space-y-3">
          <li className="text-gray-600 cursor-pointer hover:text-red-500">My Returns</li>
          <li className="text-gray-600 cursor-pointer hover:text-red-500">My Cancellations</li>
        </ul>
        <h2 className="text-gray-800 text-lg font-semibold mt-6 mb-4">My Wishlist</h2>
      </div>

      {/* Profile Content */}
      <div className="w-3/4 p-8 bg-white shadow-md rounded-lg ml-6">
        <h1 className="text-xl text-red-500 font-bold mb-6">Edit Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">First Name</label>
            <input
              className="w-full border border-gray-300 h-10 rounded-lg px-4 bg-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
              type="text"
              placeholder="Md"
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
            <input
              className="w-full border border-gray-300 h-10 rounded-lg px-4 bg-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
              type="text"
              placeholder="Rimel"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              className="w-full border border-gray-300 h-10 rounded-lg px-4 bg-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
              type="email"
              placeholder="rime1111@gmail.com"
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              className="w-full border border-gray-300 h-10 rounded-lg px-4 bg-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
              type="text"
              placeholder="Kingston, 5236, United State"
              
            />
          </div>
        </div>

        <h2 className="mt-6 text-lg text-gray-800 font-semibold">Password Changes</h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <input
            className="w-full border border-gray-300 h-10 rounded-lg px-4 bg-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
            type="password"
            placeholder="Current Password"
          />
          <input
            className="w-full border border-gray-300 h-10 rounded-lg px-4 bg-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
            type="password"
            placeholder="New Password"
          />
          <input
            className="w-full border border-gray-300 h-10 rounded-lg px-4 bg-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
            type="password"
            placeholder="Confirm New Password"
          />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button className="text-gray-600 hover:text-red-500 transition duration-300">Cancel</button>
          <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
