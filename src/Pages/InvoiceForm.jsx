import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateField, addItem, updateItem, deleteItem, resetForm, loadSavedInvoice } from '../Store/reducers/InvoiceSlice';
import { Layout } from '../components/Layout';
import { InvoiceHeader } from '../components/InvoiceHeader';
import { AddressSection } from '../components/AddressSection';
import { ItemsTable } from '../components/ItemsTable';
import { Summary } from '../components/Summary';
import { Footer } from '../components/Footer';
import { generatePDF } from '../components/InvoiceGenerator';

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved data when component mounts
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedInvoice = localStorage.getItem('invoice');
        
        if (savedInvoice) {
          const parsedInvoice = JSON.parse(savedInvoice);
          if (parsedInvoice && Object.keys(parsedInvoice).length > 0) {
            dispatch(loadSavedInvoice(parsedInvoice));
          }
        }
      } catch (error) {
        console.error('Error loading saved invoice:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure Redux is ready
    const timeoutId = setTimeout(loadSavedData, 0);
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  // Save to localStorage whenever invoice changes
  useEffect(() => {
    if (!isLoading && invoice) {
      try {
        localStorage.setItem('invoice', JSON.stringify(invoice));
      } catch (error) {
        console.error('Error saving invoice to localStorage:', error);
      }
    }
  }, [invoice, isLoading]);

  const handleDownload = async () => {
    try {
      await generatePDF(invoice);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the form? This action cannot be undone.')) {
      dispatch(resetForm());
      localStorage.removeItem('invoice');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6 space-y-8">
        <InvoiceHeader
          invoice={invoice}
          onFieldChange={(field, value) => dispatch(updateField({ field, value }))}
        />
        
        <AddressSection
          from={invoice.from}
          to={invoice.to}
          onFromChange={(value) => dispatch(updateField({ field: 'from', value }))}
          onToChange={(value) => dispatch(updateField({ field: 'to', value }))}
        />
        
        <ItemsTable
          items={invoice.items}
          onItemUpdate={(id, field, value) => dispatch(updateItem({ id, field, value }))}
          onItemDelete={(id) => dispatch(deleteItem(id))}
          onAddItem={() => dispatch(addItem())}
        />
        
        <Summary
          invoice={invoice}
          onFieldChange={(field, value) => dispatch(updateField({ field, value }))}
          footNote={invoice.footNote}
          onFootNoteChange={(value) => dispatch(updateField({ field: 'footNote', value }))}
        />
        
        <Footer
          onDownload={handleDownload}
          onClear={handleClear}
        />
      </div>
    </Layout>
  );
};

export default InvoiceForm;