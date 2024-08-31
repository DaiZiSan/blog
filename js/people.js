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
    var particleCount = 300;
    var mouse = { x: 0, y: 0 };
    var lastMouseMoveTime = 0;
    var explosionParticles = [];
  
    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = 0.5 + Math.random() * 2;
      this.size = 2 + Math.random() * 5;
      this.color = 'rgba(255, 165, 0, ' + (0.5 + Math.random() * 0.5) + ')'; // Orange color with transparency
      this.life = 5000; // 5 seconds
    }
  
    Particle.prototype.update = function() {
      var dx = mouse.x - this.x;
      var dy = mouse.y - this.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 1) {
        this.x += dx / distance * this.speed;
        this.y += dy / distance * this.speed;
      }
      this.life -= 16.67; // 60fps
      if (this.life <= 0) {
        this.size *= 0.95;
        if (this.size < 0.5) {
          particles.splice(particles.indexOf(this), 1);
        }
      }
    };
  
    Particle.prototype.draw = function() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };
  
    function ExplosionParticle(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 2 + Math.random() * 4;
      this.size = 2 + Math.random() * 5;
      this.color = 'rgba(255, 165, 0, ' + (0.5 + Math.random() * 0.5) + ')'; // Orange color with transparency
      this.directionX = (Math.random() - 0.5) * this.speed;
      this.directionY = (Math.random() - 0.5) * this.speed;
      this.life = 1000; // 1 second
    }
  
    ExplosionParticle.prototype.update = function() {
      this.x += this.directionX;
      this.y += this.directionY;
      this.life -= 16.67; // 60fps
      if (this.life <= 0) {
        this.size *= 0.95;
        if (this.size < 0.5) {
          explosionParticles.splice(explosionParticles.indexOf(this), 1);
        }
      }
    };
  
    ExplosionParticle.prototype.draw = function() {
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
      for (var i = 0; i < explosionParticles.length; i++) {
        explosionParticles[i].update();
        explosionParticles[i].draw();
      }
      requestAnimationFrame(updateParticles);
    }
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function handleMouseMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      lastMouseMoveTime = Date.now();
    }
  
    function handleMouseClick(event) {
      for (var i = 0; i < particles.length; i++) {
        if (Math.abs(particles[i].x - mouse.x) < 10 && Math.abs(particles[i].y - mouse.y) < 10) {
          explosionParticles.push(new ExplosionParticle(particles[i].x, particles[i].y));
          particles.splice(i, 1);
          i--;
        }
      }
    }
  
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    resizeCanvas();
    createParticles();
    updateParticles();
  });
  