
import React from 'react';
import { Language } from '../types';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-primary p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition"
            aria-label="Close"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold heading-font">
            {lang === 'ta' ? 'பங்களிப்பு செய்யவும்' : 'Make a Donation'}
          </h2>
          <p className="mt-2 text-white/80 font-medium">
            {lang === 'ta' ? 'அன்னதானம் மற்றும் கோவில் திருப்பணிகளுக்கு உதவவும்.' : 'Support our Annadhanam and temple maintenance initiatives.'}
          </p>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Bank Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-secondary uppercase tracking-widest text-xs">Bank Transfer Details</h3>
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Account Name:</span>
                <span className="font-bold text-secondary">KM Periyava Sannadhi Trust</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Bank Name:</span>
                <span className="font-bold text-secondary">State Bank of India</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Account No:</span>
                <span className="font-bold text-primary text-lg">123456789012</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">IFSC Code:</span>
                <span className="font-bold text-secondary">SBIN0001234</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Branch:</span>
                <span className="font-bold text-secondary">Mayiladuthurai</span>
              </div>
            </div>
          </div>

          {/* UPI Placeholder */}
          <div className="space-y-4">
            <h3 className="font-bold text-secondary uppercase tracking-widest text-xs">Scan & Pay (UPI)</h3>
            <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center">
              <div className="w-40 h-40 bg-gray-50 rounded-2xl border-4 border-white shadow-inner flex items-center justify-center mb-4">
                <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-lg"></div>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">kmperiyava@upi</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 leading-relaxed px-4">
            {lang === 'ta' 
              ? 'பரிவர்த்தனை செய்த பிறகு, தயவுசெய்து அதன் விவரங்களை info@kmperiyavasannathi.co.in என்ற முகவரிக்கு மின்னஞ்சல் செய்யவும்.'
              : 'After making a transfer, please send the transaction details to info@kmperiyavasannathi.co.in for our records.'}
          </p>
        </div>

        <div className="p-8 pt-0">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
          >
            {lang === 'ta' ? 'முடிந்தது' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
