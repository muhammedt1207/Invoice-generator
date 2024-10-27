import React from 'react';
import { LogoUpload } from './LogoUpload';

export const InvoiceHeader = ({ invoice, onFieldChange }) => (
  <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
    <div className="w-full sm:w-2/3"> {/* Increase width here */}
      <LogoUpload
        logo={invoice.logo}
        onLogoUpload={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => onFieldChange('logo', reader.result);
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>

    <div className="space-y-3 w-full sm:w-2/3"> {/* Adjusted width for the input section */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex border-[#ffca58] border rounded-full w-full">
          <input
            type="text"
            placeholder="Invoice Key"
            className="w-2/5 p-2 border-r bg-[rgba(255,205,0,0.05)] border-[#ffca58] rounded-l-md outline-none focus:ring-0 focus:border-[#ffca58]"
            value="Invoice Number"
          />
          <input type="text"
            placeholder='#'
            className='w-6 outline-none p-1 font-semibold text-black focus:ring-0 border-r border-[#ffca58] focus:border-[#ffca58]'
            value='#'
            readOnly
          />
          <input
            type="text"
            placeholder="Invoice Number"
            className="w-2/5 p-2 outline-none focus:ring-0 rounded-r-full focus:border-[#ffca58]"
            value={invoice.invoiceNumber}
            onChange={(e) => onFieldChange('invoiceNumber', e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex border-[#ffca58] border rounded-full w-full">
          <input
            type="text"
            placeholder="Key"
            className="w-1/2 p-2 border-r-2 bg-[rgba(255,205,0,0.05)] border-[#ffca58] rounded-l-md outline-none focus:ring-0 focus:border-[#ffca58]"
            value="Invoice Date"
          />
          <input
            type="date"
            className="w-1/2 p-2 outline-none focus:ring-0 rounded-r-full focus:border-[#ffca58]"
            value={invoice.invoiceDate}
            onChange={(e) => onFieldChange('invoiceDate', e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex border-[#ffca58] border rounded-full w-full">
          <input
            type="text"
            placeholder="Key"
            className="w-1/2 p-2 border-r-2 bg-[rgba(255,205,0,0.05)] border-[#ffca58] rounded-l-md outline-none focus:ring-0 focus:border-[#ffca58]"
            value="Due Date"
          />
          <input
            type="date"
            className="w-1/2 p-2 outline-none focus:ring-0 rounded-r-full focus:border-[#ffca58]"
            value={invoice.dueDate}
            onChange={(e) => onFieldChange('dueDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);
