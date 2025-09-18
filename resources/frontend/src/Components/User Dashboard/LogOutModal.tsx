import { useState } from 'react';

interface LogOutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogOutModal = ({ isOpen, onClose, onConfirm }: LogOutModalProps) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    const handleConfirm = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onConfirm();
        }, 300);
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500/65"
                    onClick={handleClose}
                ></div>
                <div className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>

                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-medium leading-6 text-gray-900" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            පිටවීම තහවුරු කරන්න
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                ඔබට ඇත්තටම පිටවීමට අවශ්‍යද? ඔබගේ සියලු දත්ත සුරක්ෂිතව ගබඩා කර ඇත.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-3 sm:space-y-0">
                        <button
                            type="button"
                            className="inline-flex justify-center w-full px-4 py-3 text-base font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm"
                            onClick={handleClose}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            අවලංගු කරන්න
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center w-full px-4 py-3 text-base font-medium text-white bg-amber-600 border border-transparent rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:w-auto sm:text-sm"
                            onClick={handleConfirm}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            පිටවන්න
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



