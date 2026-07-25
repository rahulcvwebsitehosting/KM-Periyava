
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
      <div className="relative bg-white w-full max-w-lg rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <div className="bg-primary p-5 md:p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition"
            aria-label="Close"
          >
            ✕
          </button>
          <h2 className="text-2xl md:text-3xl font-bold heading-font">
            {lang === 'ta' ? 'பங்களிப்பு செய்யவும்' : 'Make a Donation'}
          </h2>
          <p className="mt-2 text-white/80 font-medium text-sm md:text-base">
            {lang === 'ta' ? 'அன்னதானம் மற்றும் கோவில் திருப்பணிகளுக்கு உதவவும்.' : 'Support our Annadhanam and temple maintenance initiatives.'}
          </p>
        </div>
        
        <div className="p-5 md:p-8 space-y-8">
          {/* Bank Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-secondary uppercase tracking-widest text-xs">Bank Transfer Details</h3>
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Account Name:</span>
                <span className="font-bold text-secondary">Kandhamangalam Maha Periyava Trust</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Bank Name:</span>
                <span className="font-bold text-secondary">City Union Bank (CUB)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Account No:</span>
                <span className="font-bold text-primary text-lg">500101011983121</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">IFSC Code:</span>
                <span className="font-bold text-secondary">CIUB0000279</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Branch:</span>
                <span className="font-bold text-secondary">Mylapore</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-secondary uppercase 
              tracking-widest text-xs">GPay / UPI</h3>
            <div className="bg-orange-50 p-6 rounded-3xl border 
              border-orange-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium">
                    GPay Number
                  </p>
                  <p className="text-2xl font-bold text-secondary 
                    tracking-wide">
                    +91 89255 11855
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold 
                    uppercase tracking-widest">
                    Kandhamangalam Maha Periyava Trust
                  </p>
                </div>
                <div className="w-14 h-14 bg-white rounded-2xl 
                  flex items-center justify-center shadow-sm 
                  border border-orange-100 text-3xl">
                  📲
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 leading-relaxed px-4">
            {lang === 'ta' 
              ? 'பரிவர்த்தனை செய்த பிறகு, தயவுசெய்து அதன் விவரங்களை info@kmperiyavasannathi.co.in என்ற முகவரிக்கு மின்னஞ்சல் செய்யவும்.'
              : 'After making a transfer, please send the transaction details to info@kmperiyavasannathi.co.in for our records.'}
          </p>
        </div>

        <div className="p-5 md:p-8 pt-0">
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
