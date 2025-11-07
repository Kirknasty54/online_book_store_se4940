import { useEffect, useRef, useState } from "react";

export default function BookAnimation() {
    const [leftIndex, setLeftIndex] = useState(0);
    const [rightIndex, setRightIndex] = useState(0);   // static right page underlay
    const [isFlipping, setIsFlipping] = useState(false);
    const [reveal, setReveal] = useState(true);        // controls text visibility when not flipping

    const DUR = 1200;           // total flip duration (ms)
    const HALF = DUR / 2;      // when to swap the static right page
    const timerRef = useRef(null);

    const pages = [
        { left: "📚", right: "Welcome to our bookstore!" },
        { left: "Discover", right: "thousands of books" },
        { left: "Find your", right: "next adventure" },
        { left: "📖", right: "Start reading today" }
    ];

    // Keep initial right page aligned with left
    useEffect(() => setRightIndex(leftIndex), [leftIndex]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            const next = (leftIndex + 1) % pages.length;
            flipTo(next);
        }, 3000);

        return () => clearInterval(timerRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leftIndex, pages.length]);

    const flipTo = (next) => {
        if (isFlipping) return;
        setIsFlipping(true);
        setReveal(false); // hide all text immediately

        const halfT = setTimeout(() => {
            setRightIndex(next); // swap the static right page mid-flip
        }, HALF);

        const endT = setTimeout(() => {
            setLeftIndex(next);
            setIsFlipping(false);
            // tiny delay before reveal so opacity transition is visible
            setTimeout(() => setReveal(true), 20);
        }, DUR);

        // If component unmounts mid-flip
        return () => {
            clearTimeout(halfT);
            clearTimeout(endT);
        };
    };

    return (
        <div className="flex justify-center items-center py-12">
            <div className="relative" style={{ perspective: "1200px" }}>
                {/* Book */}
                <div className="relative w-96 h-64 bg-gradient-to-r from-amber-800 to-amber-900 rounded-lg shadow-2xl overflow-hidden">
                    {/* Spine */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/20 z-10" />

                    {/* Left Page (static) */}
                    <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-l-lg p-6 flex items-center justify-center border-r-2 border-amber-200">
                        <div className={`text-center transition-opacity duration-300 ${reveal ? "opacity-100" : "opacity-0"}`}>
                            <p className="text-4xl mb-2 select-none">{pages[leftIndex].left}</p>
                        </div>
                    </div>

                    {/* Right Page (static underlay) */}
                    <div className="absolute left-1/2 top-0 w-1/2 h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-r-lg p-6 flex items-center justify-center">
                        <div className={`text-center transition-opacity duration-300 ${reveal ? "opacity-100" : "opacity-0"}`}>
                            <p className="text-lg font-medium text-gray-800 select-none">
                                {pages[rightIndex].right}
                            </p>
                        </div>
                    </div>

                    {/* Flipping Sheet (overlay) — NO TEXT */}
                    <div
                        className={[
                            "absolute left-1/2 top-0 w-1/2 h-full origin-left rounded-r-lg",
                            "transform-gpu will-change-transform",
                            isFlipping ? "flip-anim" : "opacity-0 pointer-events-none",
                        ].join(" ")}
                    >
                        {/* Front face (blank paper look) */}
                        <div
                            className="absolute inset-0 rounded-r-lg bg-gradient-to-br from-amber-50 to-amber-100 backface-hidden"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            {/* soft curl and edge shade */}
                            <div className="pointer-events-none absolute inset-0 rounded-r-lg shadow-2xl shadow-black/20" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/10 to-transparent rounded-r-lg" />
                        </div>

                        {/* Back face (blank paper look) */}
                        <div
                            className="absolute inset-0 rounded-r-lg bg-gradient-to-br from-amber-100 to-amber-50 backface-hidden"
                            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-r-lg shadow-xl shadow-black/15" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/5 to-transparent rounded-l" />
                        </div>
                    </div>

                    {/* Book Shadow */}
                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-black/30 blur-sm rounded-full" />
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-6 gap-2">
                    {pages.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all ${i === leftIndex ? "bg-amber-600 w-6" : "bg-amber-300 w-2"}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .flip-anim {
                    animation: flip-kf ${DUR}ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
                    filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.2));
                }
                @keyframes flip-kf {
                    0% { transform: rotateY(0deg) translateZ(0px); }
                    45% { transform: rotateY(-85deg) translateZ(1px); }
                    55% { transform: rotateY(-95deg) translateZ(1px); }
                    100% { transform: rotateY(-180deg) translateZ(0px); }
                }
                .backface-hidden {
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                }
            `}</style>
        </div>
    );
}
