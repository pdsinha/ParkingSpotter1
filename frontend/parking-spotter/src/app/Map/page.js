'use client';
import { useState } from 'react';

export default function MapPage() {
    const lots = ['Lot A', 'Lot B', 'Lot C', 'Lot D', 'Lot E', 'Lot F', 'Lot G', 'Lot H', 'Lot I'];
    const [selectedLot, setSelectedLot] = useState('');

    const handleLotClick = (lot) => {
        setSelectedLot(lot);
        // Additional logic
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-title text-4xl mb-4">
                Parking Lots
            </h1>
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {lots.map((lot, index) => (
                    <button 
                        key={index} 
                        className="bg-white text-black border border-gray-300 hover:border-gray-500 font-bold py-2 px-4 rounded shadow"
                        onClick={() => handleLotClick(lot)}
                    >
                        {lot}
                    </button>
                ))}
            </div>

            {selectedLot && (
                <div className="text-center mt-4">
                    You made a report for {selectedLot}.
                </div>
            )}

            {/* Rest of the component */}
        </section>
    );
}