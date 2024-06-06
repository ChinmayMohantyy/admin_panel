import { useEffect } from 'react';
import anime from 'animejs';
const Loader = () => {
    useEffect(() => {
        anime({
            targets: '.animated-path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1000,
            loop: true,
            direction: 'alternate',
        });
    }, []);
    return (
        <div>
            <svg width="200" height="200" viewBox="0 0 100 100">
                <circle
                    className="animated-path"
                    cx="50"
                    cy="50"
                    r="10"
                    stroke="blue"
                    strokeWidth="4"
                    fill="none"
                />
            </svg>
        </div>

    )
}

export default Loader