import React from 'react';

export const ItemsTable = ({ items, onItemUpdate, onItemDelete, onAddItem }) => (
  <div className="mb-8 overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="border-y">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item, index) => (
          <tr key={item.id} className='bg-gray-100'>
            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
            <td className="px-2 py-2">
              <input
                type="text"
                className="form-input  block w-full text-sm p-1 rounded-md border border-[#ffca58] shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={item.description}
                placeholder='Description of service or product'
                onChange={(e) => onItemUpdate(item.id, 'description', e.target.value)}
              />
            </td>
            <td className="px-2 py-2">
              <input
                type="number"
                className="form-input appearance-none p-1 block w-full rounded-md border border-[#ffca58] shadow-sm focus:border-gray-100 focus:ring-gray-100"
                value={item.quantity}
                placeholder='Quantity'
                onChange={(e) => onItemUpdate(item.id, 'quantity', e.target.value)}
                min="0"
                style={{
                  MozAppearance: "textfield", // Firefox
                  WebkitAppearance: "none",    // Chrome, Safari, Edge
                }}
              />
            </td>
            <td className="px-2 py-2">
              <input
                type="number"
                className="form-input p-1 block w-full rounded-md border border-[#ffca58] shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={item.rate}
                placeholder='Price'
                onChange={(e) => onItemUpdate(item.id, 'rate', e.target.value)}
                min="0"
                step="0.01"
              />
            </td>
            <td className="px-2 p-2 py-2 text-right text-sm font-medium text-gray-900">
              {(item.quantity * item.rate).toFixed(2)}
            </td>
            <td className="px-2 p-2 py-2 text-right">
              {items.length > 1 && (
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => onItemDelete(item.id)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      className="mt-4 inline-flex items-center p-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      onClick={onAddItem}
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add Item
    </button>
  </div>
);
