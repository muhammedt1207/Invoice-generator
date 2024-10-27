import React, { useState } from 'react';

const PillowField = ({ label, value, onChange, readOnly = false, suffix }) => (
  <div className="flex items-center w-full max-w-xs border-[#ffca58] rounded-full border overflow-hidden">
    <span className="px-2 py-2 border border-r-[#ffca58] text-gray-700 font-medium border-r min-w-[130px] max-w-[130px]">
      {label}
    </span>
    <div className="flex items-center flex-1">
      {readOnly ? (
        <span className="px-4 py-2 flex-1 text-right">{value}</span>
      ) : (
        <input
          type="number"
          value={value}
          onChange={onChange}
          className="px-4 py-2 flex-1 text-right focus:outline-none"
          min="0"
          step="0.01"
        />
      )}
      {suffix && <span className="pr-20 text-gray-700">{suffix}</span>}
    </div>
  </div>
);

export const Summary = ({ invoice, onFieldChange, footNote, onFootNoteChange }) => {
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [showShipping, setShowShipping] = useState(false);

  const calculateTaxableValue = () => {
    const taxableValue = invoice.subtotal - (invoice.discounts || 0) + (invoice.shipping || 0);
    return Math.max(0, taxableValue);
  };

  const calculateTotal = () => {
    const taxableValue = calculateTaxableValue();
    return taxableValue * (1 + (invoice.taxRate || 0) / 100);
  };

  const calculateBalanceDue = () => {
    return calculateTotal() - (invoice.amountPaid || 0);
  };

  return (
    <div className="md:flex justify-between   mb-8">
      {/* Left Side (Terms & Conditions, Foot Note) */}
      <div className="flex flex-col   md:w-[46vw] md:max-w-md md:space-y-4 items-center">
        <div className='w-full '>
          <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
          <textarea
            className="w-full rounded-lg border border-[#ffca58] p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            value={invoice.terms}
            onChange={(e) => onFieldChange('terms', e.target.value)}
            placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
          />
        </div>
        <div className='w-full'>
          <label className="block text-sm font-medium text-gray-700 mb-2">Foot Note</label>
          <textarea
            className="w-full rounded-lg border border-[#ffca58] p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            value={footNote}
            onChange={(e) => onFootNoteChange(e.target.value)}
            placeholder="Thank you for your business"
          />
        </div>
      </div>

      {/* Right Side (Summary Fields) */}
      <div className="flex flex-col md:items-end items-center mt-5 space-y-1 ">
        <PillowField
          label="Subtotal"
          value={invoice.subtotal?.toFixed(2)}
          readOnly
        />

        <div className="flex gap-2 w-full max-w-xs">
          <button
            onClick={() => setShowDiscounts(!showDiscounts)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
          >
            <span className="text-xl text-gray-500">{showDiscounts ? '−' : '+'}</span>
            <span className='text-red-500'>Discounts</span>
          </button>
          <button
            onClick={() => setShowShipping(!showShipping)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
          >
            <span className="text-xl text-gray-500">{showShipping ? '−' : '+'}</span>
            <span className='text-red-500'>Shipping</span>
          </button>
        </div>

        {showDiscounts && (
          <PillowField
            label="Discounts"
            value={invoice.discounts || ''}
            onChange={(e) => onFieldChange('discounts', Number(e.target.value))}
          />
        )}

        {showShipping && (
          <PillowField
            label="Shipping"
            value={invoice.shipping || ''}
            onChange={(e) => onFieldChange('shipping', Number(e.target.value))}
          />
        )}

        <PillowField
          label="Taxable Value"
          value={calculateTaxableValue().toFixed(2)}
          readOnly
        />

        <PillowField
          label="Tax Rate"
          value={invoice.taxRate || ''}
          onChange={(e) => onFieldChange('taxRate', Number(e.target.value))}
          suffix="%"
        />

        <div className="flex justify-between max-w-xs w-full  items-center py-3">
          <p className="text-lg font-semibold text-gray-700">Total</p>
          <p className="text-lg font-bold">
            ${calculateTotal().toFixed(2)}
          </p>
        </div>

        <PillowField
          label="Amount Paid"
          value={invoice.amountPaid || ''}
          onChange={(e) => onFieldChange('amountPaid', Number(e.target.value))}
        />

        <PillowField
          label="Balance Due"
          value={calculateBalanceDue().toFixed(2)}
          readOnly
        />
      </div>
    </div>
  );
};

export default Summary;
