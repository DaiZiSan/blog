import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

class WelcomeAnimation {
  constructor() {
    this.init();
  }

  async init() {
    // 检查是否是新IP
    const isNewIP = await this.checkNewIP();
    if (!isNewIP) {
      this.showBlog();
      return;
    }

    // 创建加载页面
    this.createLoadingPage();
    
    // 预加载o.jpg
    await this.preloadImage('/img/o.jpg');
    
    // 开始动画
    await this.startAnimation();
    
    // 动画结束后显示博客
    this.showBlog();
  }

  async checkNewIP() {
    try {
      const response = await fetch('/api/check-ip'); // 需要后端配合实现
      const data = await response.json();
      return data.isNewIP;
    } catch (error) {
      console.error('检查IP失败:', error);
      return false;
    }
  }

  createLoadingPage() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'welcome-overlay';
    
    this.loadingImage = document.createElement('img');
    this.loadingImage.src = '/img/o.jpg';
    this.loadingImage.className = 'welcome-image';
    
    this.overlay.appendChild(this.loadingImage);
    document.body.appendChild(this.overlay);
    
    // 隐藏博客内容
    document.querySelector('#content-inner').style.opacity = '0';
  }

  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  }

  async startAnimation() {
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);

    // 创建粒子
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'welcome-particle';
      particleContainer.appendChild(particle);
      particles.push(particle);
      
      // 随机初始位置
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
    }

    // 粒子汇聚动画
    await this.convergeParticles(particles);
    
    // 形成几何体
    await this.formGeometry(particles);
    
    // 爆炸效果
    await this.explodeParticles(particles);
    
    // 清理动画元素
    particleContainer.remove();
  }

  async convergeParticles(particles) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    return new Promise(resolve => {
      particles.forEach(particle => {
        particle.style.transition = 'all 1s ease-in-out';
        particle.style.left = `${centerX + (Math.random() - 0.5) * 100}px`;
        particle.style.top = `${centerY + (Math.random() - 0.5) * 100}px`;
      });
      
      setTimeout(resolve, 1000);
    });
  }

  async formGeometry(particles) {
    return new Promise(resolve => {
      const radius = 100;
      particles.forEach((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const x = window.innerWidth / 2 + Math.cos(angle) * radius;
        const y = window.innerHeight / 2 + Math.sin(angle) * radius;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
      });
      
      setTimeout(resolve, 1000);
    });
  }

  async explodeParticles(particles) {
    return new Promise(resolve => {
      particles.forEach(particle => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 1000 + Math.random() * 500;
        const x = window.innerWidth / 2 + Math.cos(angle) * distance;
        const y = window.innerHeight / 2 + Math.sin(angle) * distance;
        
        particle.style.transition = 'all 0.8s ease-in-out';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = '0';
      });
      
      setTimeout(resolve, 800);
    });
  }

  showBlog() {
    // 淡出加载页面
    if (this.overlay) {
      this.overlay.style.opacity = '0';
      setTimeout(() => {
        this.overlay.remove();
      }, 1000);
    }
    
    // 显示博客内容
    const content = document.querySelector('#content-inner');
    content.style.opacity = '1';
    content.style.transition = 'opacity 1s ease-in-out';
  }
}

// 检查是否是新访客
function isNewVisitor() {
  const visited = localStorage.getItem('visited');
  if (!visited) {
    localStorage.setItem('visited', 'true');
    return true;
  }
  return false;
}

// 初始化欢迎动画
document.addEventListener('DOMContentLoaded', () => {
  if (isNewVisitor()) {
    new WelcomeAnimation();
  } else {
    document.querySelector('.home-content').style.opacity = '1';
  }
}); 