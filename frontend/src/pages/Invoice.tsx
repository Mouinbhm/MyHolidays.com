import { useEffect, useRef } from "react";
import html2pdf from 'html2pdf.js';

const Invoice = () => {
    const pdfRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      setTimeout(() => {
        const element = pdfRef.current;
        html2pdf().from(element).set({
          margin: 0.5,
          filename: 'booking-invoice.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        }).save();
      }, 300); // small delay to ensure render
    }, []);
  
    return (
      <div className="h-full" ref={pdfRef}>
        <h1>test pdf</h1>
      </div>
    );
}

export default Invoice
