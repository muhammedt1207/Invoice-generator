import React from 'react';

export const LogoUpload = ({ logo, onLogoUpload }) => (
  <div className="w-full max-w-sm p-4 justify-center items-center flex flex-col"> 
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[160px] relative bg-white w-full"> {/* Added w-full */}
      {logo ? (
        <img src={logo} alt="Company Logo" className="max-w-full max-h-[120px] object-contain" />
      ) : (
        <div className="text-center">
<p className="text-xl font-black mb-2 text-center">
  Company <br /> LOGO
</p>
        </div>
      )}
    </div>
    <div className="mt-4">
      <label className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full cursor-pointer inline-flex items-center transition-colors duration-200">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Upload Logo
        <input type="file" className="hidden" accept="image/*" onChange={onLogoUpload} />
      </label>
    </div>
  </div>
);
