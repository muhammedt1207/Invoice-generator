import React from 'react';

export const AddressSection = ({ from, to, onFromChange, onToChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Invoice From</label>
      <textarea
        className="form-textarea mt-1 block w-full rounded-md border p-2 border-[#ffca58] shadow-sm focus:border-gray-300 focus:ring-gray-300"
        rows="4"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        placeholder="Your Company Details"
      />
    </div>
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Invoice To</label>
      <textarea
        className="form-textarea mt-1 block w-full rounded-md border p-2 border-[#ffca58] shadow-sm focus:border-purple-500 focus:ring-purple-500"
        rows="4"
        value={to}
        onChange={(e) => onToChange(e.target.value)}
        placeholder="Client Details"
      />
    </div>
  </div>
);