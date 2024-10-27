import React from 'react';
import jsPDF from 'jspdf';

export const generatePDF = async (invoiceData) => {
  const doc = new jsPDF();
  
  // Page configuration
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPos = margin;
  let currentPage = 1;

  // Helper function to check if we need a new page
  const checkPageBreak = (heightNeeded = 10) => {
    if (yPos + heightNeeded >= pageHeight - margin) {
      doc.addPage();
      currentPage++;
      // Reset yPos for new page and add header if needed
      yPos = margin;
      // Add page number at the bottom
      const pageText = `Page ${currentPage}`;
      doc.setFontSize(10);
      doc.text(pageText, pageWidth / 2, pageHeight - 10, { align: 'center' });
      return true;
    }
    return false;
  };
  
  // Helper function to add text and update y position
  const addText = (text, x, y, options = {}) => {
    const {
      fontSize = 12,
      fontStyle = 'normal',
      align = 'left'
    } = options;
    
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    
    // Calculate text height before adding
    const textHeight = doc.getTextDimensions(text).h + 2;
    
    // Check if we need a new page
    if (checkPageBreak(textHeight)) {
      y = yPos; // Update y coordinate if we moved to a new page
    }
    
    doc.text(text, x, y, { align });
    return textHeight;
  };

  // Function to load and add logo
  const addLogo = async () => {
    if (!invoiceData.logo) return;

    try {
      let logoData = invoiceData.logo;
      if (invoiceData.logo.startsWith('http')) {
        const response = await fetch(invoiceData.logo);
        const blob = await response.blob();
        logoData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }

      const maxWidth = 40;
      const maxHeight = 40;
      
      doc.addImage(
        logoData,
        'JPEG',
        margin,
        yPos,
        maxWidth,
        maxHeight,
        undefined,
        'FAST'
      );

      yPos += maxHeight + 10;
    } catch (error) {
      console.error('Error adding logo:', error);
    }
  };

  // Add logo first
  await addLogo();

  // Title
  const titleX = pageWidth - margin;
  yPos += addText('Invoice', titleX, yPos, { fontSize: 24, align: 'right', fontStyle: 'bold' });
//   yPos += 10;

  // Invoice details on the right side
  const rightMargin = pageWidth - margin;
  let detailsYPos = yPos;

  if (invoiceData.invoiceNumber) {
    detailsYPos += addText(`INVOICE: ${invoiceData.invoiceNumber}`, rightMargin, detailsYPos, { align: 'right' });
  }
  
  if (invoiceData.invoiceDate) {
    detailsYPos += addText(`Invoice date: ${invoiceData.invoiceDate}`, rightMargin, detailsYPos, { align: 'right' });
  }
  
  if (invoiceData.dueDate) {
    detailsYPos += addText(`Due date: ${invoiceData.dueDate}`, rightMargin, detailsYPos, { align: 'right' });
  }

  yPos = Math.max(yPos, detailsYPos) + 10;

  // From and To sections
  if (invoiceData.from) {
    checkPageBreak(30); // Check if we need a new page for this section
    yPos += addText('Invoice from', margin, yPos, { fontStyle: 'bold' });
    yPos += addText(invoiceData.from, margin, yPos);
    yPos += 10;
  }
  
  if (invoiceData.to) {
    checkPageBreak(30);
    yPos += addText('Invoice to', margin, yPos, { fontStyle: 'bold' });
    yPos += addText(invoiceData.to, margin, yPos);
    yPos += 10;
  }

  // Items table
  if (invoiceData.items && invoiceData.items.length > 0) {
    const colWidths = {
      number: 15,
      description: 80,
      quantity: 25,
      rate: 30,
      amount: 30
    };
    const tableWidth = 180;
    
    // Function to draw table header
    const drawTableHeader = () => {
      let currentX = margin;
      doc.setFillColor(80, 80, 80);
      doc.rect(margin, yPos - 5, tableWidth, 10, 'F');
      doc.setTextColor(255, 255, 255);
      
      addText('#', currentX, yPos, { fontStyle: 'bold' });
      currentX += colWidths.number;
      
      addText('Description', currentX, yPos, { fontStyle: 'bold' });
      currentX += colWidths.description;
      
      addText('Quantity', currentX, yPos, { fontStyle: 'bold' });
      currentX += colWidths.quantity;
      
      addText('Rate', currentX, yPos, { fontStyle: 'bold' });
      currentX += colWidths.rate;
      
      addText('Amount', currentX, yPos, { fontStyle: 'bold' });
      
      doc.setTextColor(0, 0, 0);
      yPos += 10;
    };

    // Draw initial table header
    drawTableHeader();

    // Table rows
    invoiceData.items.forEach((item, index) => {
      // Check if we need a new page for this row
      if (checkPageBreak(15)) {
        drawTableHeader(); // Redraw header on new page
      }

      let currentX = margin;
      
      doc.setFillColor(index % 2 === 0 ? 220 : 245, index % 2 === 0 ? 220 : 245, index % 2 === 0 ? 220 : 245);
      doc.rect(margin, yPos - 5, tableWidth, 8, 'F');

      addText((index + 1).toString(), currentX, yPos);
      currentX += colWidths.number;

      addText(item.description, currentX, yPos);
      currentX += colWidths.description;

      addText(item.quantity.toString(), currentX, yPos);
      currentX += colWidths.quantity;

      addText(item.rate.toString(), currentX, yPos);
      currentX += colWidths.rate;

      addText(item.amount.toString(), currentX, yPos);

      yPos += 8;
    });

    yPos += 10;
  }
  // Payment terms
  if (invoiceData.terms) {
    yPos += addText('Terms', 20, yPos, { fontStyle: 'bold' });
    yPos += addText(invoiceData.terms, 20, yPos);
    
  }


  // Totals section
  const drawTotalsSection = () => {
    checkPageBreak(50); // Ensure enough space for totals
    
    const leftColX = pageWidth - 80;
    const rightColX = pageWidth - margin;
    const lineHeight = 8;

    const addTotalRow = (label, value, options = {}) => {
      const {
        fontStyle = 'normal',
        fontSize = 12,
        useSymbol = true
      } = options;
      
      addText(label, leftColX, yPos, { fontStyle, fontSize });
      const formattedValue = typeof value === 'number' && useSymbol 
        ? `Rs. ${value.toFixed(2)}` 
        : value;
      addText(formattedValue, rightColX, yPos, { align: 'right', fontStyle, fontSize });
      yPos += lineHeight;
    };

    // Draw totals
    if (typeof invoiceData.subtotal === 'number') {
      doc.setFillColor(60, 60, 60);
      doc.rect(leftColX - 5, yPos - lineHeight + 2, 70, lineHeight, 'F');
      doc.setTextColor(255, 255, 255);
      addTotalRow('Subtotal', invoiceData.subtotal);
      doc.setTextColor(0, 0, 0);
    }

    if (typeof invoiceData.discounts === 'number') {
      addTotalRow('Discounts', invoiceData.discounts);
    }

    if (invoiceData.shipping) {
      addTotalRow('Shipping', invoiceData.shipping);
    }

    if (typeof invoiceData.taxRate === 'number') {
      addTotalRow('Taxable Value', `${invoiceData.taxRate}%`, { useSymbol: false });
    }

    if (typeof invoiceData.amountPaid === 'number') {
      addTotalRow('Amount Paid', invoiceData.amountPaid);
    }

    // Final balance
    if (typeof invoiceData.balanceDue === 'number') {
      doc.setFillColor(80, 80, 80);
      doc.rect(leftColX - 5, yPos - lineHeight + 2, 70, lineHeight, 'F');
      doc.setTextColor(255, 255, 255);
      addTotalRow('Balance Due', invoiceData.balanceDue, { 
        fontStyle: 'bold',
        fontSize: 13
      });
      doc.setTextColor(0, 0, 0);
    }
  };

  drawTotalsSection();

  // Footer
  if (invoiceData.footNote) {
    checkPageBreak(30);
    yPos += 20;
    addText('Foot Note', margin, yPos, { fontStyle: 'bold' });
    yPos += 8;
    addText(invoiceData.footNote, margin, yPos);
  }

  // Add page numbers to all pages
  const totalPages = currentPage;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    const pageText = `Page ${i} of ${totalPages}`;
    doc.setFontSize(10);
    doc.text(pageText, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  // Save the PDF
  doc.save(`Invoice-${invoiceData.invoiceNumber || 'new'}.pdf`);
};