import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

class WelcomeAnimation {
  constructor() {
    this.particles = [];
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.init();
  }

  init() {
    // 初始化渲染器
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    document.body.appendChild(this.renderer.domElement);
    
    // 设置相机位置
    this.camera.position.z = 5;

    // 创建粒子
    this.createParticles();
    
    // 创建遮罩层
    this.overlay = document.createElement('div');
    this.overlay.className = 'welcome-overlay';
    document.body.appendChild(this.overlay);

    // 开始动画
    this.animate();
  }

  createParticles() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      // 随机分布在屏幕各处
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true
    });
    
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  async animate() {
    // 第一阶段：粒子汇聚成立方体
    await this.formCube();
    
    // 第二阶段：变形为多边形
    await this.transformToPolygon();
    
    // 第三阶段：爆炸效果
    await this.explode();
    
    // 最后：显示网站内容
    this.showWebsite();
  }

  async formCube() {
    return new Promise(resolve => {
      const positions = this.particleSystem.geometry.attributes.position.array;
      const targetPositions = new Float32Array(positions.length);
      
      // 创建目标立方体的顶点
      for(let i = 0; i < positions.length; i += 3) {
        targetPositions[i] = (Math.random() - 0.5) * 2;
        targetPositions[i + 1] = (Math.random() - 0.5) * 2;
        targetPositions[i + 2] = (Math.random() - 0.5) * 2;
      }
      
      const animate = () => {
        for(let i = 0; i < positions.length; i += 3) {
          positions[i] += (targetPositions[i] - positions[i]) * 0.02;
          positions[i + 1] += (targetPositions[i + 1] - positions[i + 1]) * 0.02;
          positions[i + 2] += (targetPositions[i + 2] - positions[i + 2]) * 0.02;
        }
        
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        
        if(this.isAnimationComplete(positions, targetPositions)) {
          resolve();
        } else {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    });
  }

  async transformToPolygon() {
    return new Promise(resolve => {
      const positions = this.particleSystem.geometry.attributes.position.array;
      const targetPositions = new Float32Array(positions.length);
      
      // 创建多边形的顶点
      const sides = 8;
      for(let i = 0; i < positions.length; i += 3) {
        const angle = (i / 3) * (Math.PI * 2 / sides);
        targetPositions[i] = Math.cos(angle) * 2;
        targetPositions[i + 1] = Math.sin(angle) * 2;
        targetPositions[i + 2] = 0;
      }
      
      const animate = () => {
        for(let i = 0; i < positions.length; i += 3) {
          positions[i] += (targetPositions[i] - positions[i]) * 0.02;
          positions[i + 1] += (targetPositions[i + 1] - positions[i + 1]) * 0.02;
          positions[i + 2] += (targetPositions[i + 2] - positions[i + 2]) * 0.02;
        }
        
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        
        if(this.isAnimationComplete(positions, targetPositions)) {
          resolve();
        } else {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    });
  }

  async explode() {
    return new Promise(resolve => {
      const positions = this.particleSystem.geometry.attributes.position.array;
      const velocities = new Float32Array(positions.length);
      
      // 设置爆炸速度
      for(let i = 0; i < velocities.length; i += 3) {
        velocities[i] = (Math.random() - 0.5) * 0.3;
        velocities[i + 1] = (Math.random() - 0.5) * 0.3;
        velocities[i + 2] = (Math.random() - 0.5) * 0.3;
      }
      
      let frame = 0;
      const animate = () => {
        frame++;
        
        for(let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];
        }
        
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        
        if(frame > 120) { // 2秒后结束爆炸效果
          resolve();
        } else {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    });
  }

  showWebsite() {
    // 淡出动画效果
    this.overlay.style.opacity = '0';
    
    // 移除3D场景
    setTimeout(() => {
      document.body.removeChild(this.renderer.domElement);
      document.body.removeChild(this.overlay);
      
      // 显示网站内容
      document.querySelector('.home-content').style.opacity = '1';
    }, 1000);
  }

  isAnimationComplete(current, target, threshold = 0.01) {
    for(let i = 0; i < current.length; i++) {
      if(Math.abs(current[i] - target[i]) > threshold) {
        return false;
      }
    }
    return true;
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