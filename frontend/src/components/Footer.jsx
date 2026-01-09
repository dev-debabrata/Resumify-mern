import React from 'react'

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="p-4 text-sm text-gray-400 bg-black border-t mt-20 h-[100px] flex justify-center items-center">
                <h1>© Copyright {currentYear} by Debabrata Das | All rights reserved</h1>
            </div>
        </footer>
    );
}
