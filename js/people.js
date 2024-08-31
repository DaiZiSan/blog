// flame-particles.js
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.createElement('canvas');
    canvas.id = 'flame-particles';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
  
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 100;
  
    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.speed = 0.5 + Math.random() * 2;
      this.size = 2 + Math.random() * 5;
      this.color = 'rgba(255, 165, 0, ' + (0.5 + Math.random() * 0.5) + ')'; // Orange color with transparency
    }
  
    Particle.prototype.update = function() {
      this.y -= this.speed;
      if (this.y < -this.size) {
        this.y = canvas.height + this.size;
      }
    };
  
    Particle.prototype.draw = function() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };
  
    function createParticles() {
      for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
  
    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(updateParticles);
    }
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    updateParticles();
  });
  