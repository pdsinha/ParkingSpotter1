'use client';
import { useState } from 'react';
import './page.css'; 

export default function MapPage() {
    const lots = ['Lot A', 'Lot B', 'Lot C', 'Lot D', 'Lot E', 
    'Lot F', 'Lot G', 'Lot H', 'Lot I', 'Lot J', 'Lot P', 'Lot T', 'Lot U'];
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
            <div className="grid-container">
                {lots.map((lot, index) => (
                    <button 
                        key={index} 
                        className="lot-button"
                        onClick={() => handleLotClick(lot)}
                    >
                        {lot}
                    </button>
                ))}
            </div>

            {selectedLot && (
                <div className="text-center mt-4">
                    Direct you to all reports of {selectedLot}.
                </div>
            )}

            {/* Rest of the component */}
        </section>
    );
}