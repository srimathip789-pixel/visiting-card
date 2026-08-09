document.addEventListener('DOMContentLoaded', () => {
    // Add subtle tilt effect to glass panels based on mouse movement
    const panels = document.querySelectorAll('.glass-panel');
    
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        panels.forEach(panel => {
            // Apply a very subtle transform to make the UI feel alive
            // We use requestAnimationFrame for smooth performance, but this simple approach works for small numbers of elements
            panel.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-2px)`;
        });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        panels.forEach(panel => {
            panel.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)`;
        });
    });
});
