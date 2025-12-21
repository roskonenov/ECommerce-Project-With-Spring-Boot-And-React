import { useEffect, useState } from "react";
import { aboutImages } from "../../utils/data";

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!aboutImages || aboutImages.length === 0) return;

        const id = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % aboutImages.length);
        }, 5000);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const nextImage = new window.Image();
        nextImage.src = aboutImages[currentIndex + 1 % aboutImages.length];
    }, [currentIndex]);

    return (
        <div className="mx-auto w-full flex flex-col p-8">
            <div className="text-center my-16">
                <h1 className="text-4xl font-bold text-slate-800">
                    About Us
                </h1>
            </div>
            <section className="w-[85%] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="flex-100 md:flex-50 text-slate-700 font-bold mx-10 text-center">
                    Welcome to our online store! We believe shopping should be simple, enjoyable, and accessible to everyone. That's why we offer a carefully curated selection of products that combine quality, style, and practicality.
                    Our mission is to provide fast service, secure shopping, and a personalized experience every time. Thank you for choosing us — your trust is our greatest motivation.
                </p>
                <div className="w-full min-h-110 md:max-w-[45%] md:w-1/2 rounded-md flex items-center justify-center">
                    <img
                        key={currentIndex}
                        src={aboutImages[currentIndex]}
                        alt="E-Commerce image"
                        className="transform transition-transform duration-300 animate-slide-right rounded-md w-full h-full object-cover shadow-lg" />
                </div>
            </section>
        </div>
    );
};

export default About;