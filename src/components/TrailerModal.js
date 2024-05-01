import React, { useEffect, useState } from 'react';

const TrailerModal = ({ isOpen, onClose, trailerUrl }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (trailerUrl) {
            setIsLoading(true);
        }
    }, [trailerUrl]);

    if (!isOpen) return null;

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl font-bold">&times;</button>

                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-90">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}

                <iframe
                    src={trailerUrl}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Trailer"
                    width="560"
                    height="315"
                    onLoad={handleIframeLoad}
                ></iframe>
            </div>
        </div>
    );
};

export default TrailerModal;
