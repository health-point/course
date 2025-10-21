document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('snow-container');

    const numberOfParticles = 300; 

    const size = 3;       
    const maxDuration = 100;   

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('snow'); 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const startX = Math.random() * 100;
        particle.style.left = `${startX}vw`;

        const duration = Math.random() * maxDuration+20; 
        particle.style.animationDuration = `${duration}s, ${duration}s`;


        container.appendChild(particle);
    }

    for (let i = 0; i < numberOfParticles; i++) {
        createParticle();
    }
});