import React from 'react'
import { X } from 'lucide-react';

const Modal = ({ children, isOpen, onClose, title, hideHeader, showActionBtn, actionBtnIcon = null, actionBtnText, onActionClick, }) => {

    if (!isOpen) return null;

    return (
        <div className=' fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
            <div className=' relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden'>
                {!hideHeader && (
                    <div className=' flex items-center justify-between p-4 border-b bg-gray-200'>
                        <h3 className=' md:text-lg font-medium text-gray-900'>{title}</h3>
                        {showActionBtn && (
                            <button onClick={() => onActionClick()} className=' btn-small-light mr-12'>
                                {actionBtnIcon}
                                {actionBtnText}
                            </button>
                        )}
                    </div>
                )}
                <button type='button' onClick={() => onClose()} className=' text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5'>
                    <X size={28} />
                </button>
                <div className=' flex-1 overflow-y-auto custom-scrollbar'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal