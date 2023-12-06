'use client';
import { useState } from 'react';
import './page.css'; 
import axios from 'axios'


export default function MapPage() {
    const lots = ['Lot A', 'Lot B', 'Lot C', 'Lot D', 'Lot E', 
    'Lot G', 'Lot H', 'Lot I', 'Lot J', 'Lot P', 'Lot T', 'Lot U'];
    const [selectedLot, setSelectedLot] = useState('');
    const [number, setNumber] = useState('');

    const  handleLotClick = (lot) => {
        setSelectedLot(lot);
        console.log(selectedLot)

        
        // Additional logic
         axios.post("http://localhost:8000/api/crashReports/1",
        {
            parkinglot: selectedLot
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
        )
        .then((response) => {
            console.log(response)
            setNumber(response.data.result)
    
        })
        .catch((error) => {
            console.log(error.message);
            // seterror(true);
        });



        
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
                        className="lot-button"
                        onClick={() => handleLotClick(lot)}
                    >
                        {lot}
                    </button>
                ))}
            </div>

            {selectedLot && (
                <div className="text-center mt-4">
                    There have been {number} reports for this lot in the past 30 minutes.
                </div>
            )}

            {/* Rest of the component */}
        </section>
    );
}