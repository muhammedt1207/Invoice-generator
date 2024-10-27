import React, { useState } from 'react';

const InvoiceComponent = () => {
  const [invoiceKey, setInvoiceKey] = useState('');
  const [invoiceValue, setInvoiceValue] = useState('');
  const [invoiceDateKey, setInvoiceDateKey] = useState('Invoice date');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDateKey, setDueDateKey] = useState('Due date');
  const [dueDate, setDueDate] = useState('');

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Invoice Row */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="INVOICE"
          value={invoiceKey}
          onChange={(e) => setInvoiceKey(e.target.value)}
          className="border border-[#ffca58] focus:ring-2 focus:ring-[#ffca58] rounded-l-lg p-2 w-1/2 outline-none"
        />
        <input
          type="text"
          placeholder="#"
          value={invoiceValue}
          onChange={(e) => setInvoiceValue(e.target.value)}
          className="border border-l-0 border-[#ffca58] focus:ring-2 focus:ring-[#ffca58] rounded-r-lg p-2 w-1/2 outline-none"
        />
      </div>

      {/* Invoice Date Row */}
      <div className="flex items-center">
        <input
          type="text"
          value={invoiceDateKey}
          onChange={(e) => setInvoiceDateKey(e.target.value)}
          className="border border-[#ffca58] focus:ring-2 focus:ring-[#ffca58] rounded-l-lg p-2 w-1/2 outline-none"
        />
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="dd-mm-yyyy"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="border border-l-0 border-[#ffca58] focus:ring-2 focus:ring-[#ffca58] rounded-r-lg p-2 w-full outline-none"
          />
          <span className="absolute right-3 top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-.993.883L5 3v1H3a1 1 0 00-.993.883L2 5v10a1 1 0 00.883.993L3 16h14a1 1 0 00.993-.883L18 15V5a1 1 0 00-.883-.993L17 4h-2V3a1 1 0 00-.883-.993L14 2H6zM5 7h10v7H5V7zm4 9h2v2H9v-2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Due Date Row */}
      <div className="flex items-center">
        <input
          type="text"
          value={dueDateKey}
          onChange={(e) => setDueDateKey(e.target.value)}
          className="border border-[#ffca58] focus:ring-2 focus:ring-[#ffca58] rounded-l-lg p-2 w-1/2 outline-none"
        />
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="dd-mm-yyyy"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-l-0 border-[#ffca58] focus:ring-2 focus:ring-[#ffca58] rounded-r-lg p-2 w-full outline-none"
          />
          <span className="absolute right-3 top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-.993.883L5 3v1H3a1 1 0 00-.993.883L2 5v10a1 1 0 00.883.993L3 16h14a1 1 0 00.993-.883L18 15V5a1 1 0 00-.883-.993L17 4h-2V3a1 1 0 00-.883-.993L14 2H6zM5 7h10v7H5V7zm4 9h2v2H9v-2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
