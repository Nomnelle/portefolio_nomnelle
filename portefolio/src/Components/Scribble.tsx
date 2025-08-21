import { useEffect, useRef } from "react";
import {ScribbleTransitionProps} from "../types.ts";


export function Scribble({
                                       active,
                                       duration = 1500,
                                       size = 300,
                                       onEnd,
                                   }: ScribbleTransitionProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = size;
        canvas.height = size;

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        let x = size / 2;
        let y = size / 2;
        let t0 = performance.now();

        function draw(now: number) {
            const elapsed = now - t0;
            if (elapsed > duration) {
                onEnd?.();
                return;
            }
            if(ctx!=null){
                for (let i = 0; i < 10; i++) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    x += (Math.random() - 0.5) * 80;
                    y += (Math.random() - 0.5) * 80;

                    // rebound inside the canvas
                    x = Math.max(0, Math.min(size, x));
                    y = Math.max(0, Math.min(size, y));

                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        }

        animationRef.current = requestAnimationFrame(draw);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [active, duration, size, onEnd]);

    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            />
        </div>
    );
}

export default Scribble;