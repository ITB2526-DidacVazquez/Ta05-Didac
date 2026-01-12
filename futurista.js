// Futurista background and small UI helpers
(function(){
    const canvas = document.getElementById('bgCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize(){canvas.width = innerWidth; canvas.height = innerHeight}
    resize(); window.addEventListener('resize', resize);

    const particles = Array.from({length: Math.floor((innerWidth+innerHeight)/200)}, ()=>({
        x: Math.random()*innerWidth,
        y: Math.random()*innerHeight,
        vx:(Math.random()-0.5)*0.3,
        vy:(Math.random()-0.5)*0.3,
        r: Math.random()*1.8+0.6
    }));

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // soft gradient glow
        const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
        g.addColorStop(0,'rgba(124,58,237,0.06)');
        g.addColorStop(1,'rgba(6,182,212,0.04)');
        ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle='rgba(255,255,255,0.12)';
        particles.forEach(p=>{p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0; if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill()});
        requestAnimationFrame(draw);
    }
    draw();
})();
