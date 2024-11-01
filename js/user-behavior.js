class UserBehaviorTracker {
  constructor() {
    this.behaviors = [];
    this.username = this.getUsername();
    this.startTime = new Date();
    this.initializeTracking();
  }

  // 获取用户名（可以从登录状态或localStorage获取）
  getUsername() {
    return localStorage.getItem('username') || 'anonymous';
  }

  // 记录行为
  recordBehavior(type, data) {
    const behavior = {
      username: this.username,
      timestamp: new Date(),
      type: type,
      data: data
    };
    this.behaviors.push(behavior);
    this.saveBehaviors();
  }

  // 保存行为数据到localStorage
  saveBehaviors() {
    const key = `user_behaviors_${this.username}`;
    localStorage.setItem(key, JSON.stringify(this.behaviors));
  }

  // 初始化跟踪
  initializeTracking() {
    // 记录鼠标移动
    let lastMove = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMove > 1000) { // 每秒最多记录一次
        this.recordBehavior('mouse_move', {
          x: e.clientX,
          y: e.clientY,
          path: document.location.pathname
        });
        lastMove = now;
      }
    });

    // 记录点击
    document.addEventListener('click', (e) => {
      this.recordBehavior('click', {
        x: e.clientX,
        y: e.clientY,
        element: e.target.tagName,
        path: document.location.pathname
      });
    });

    // 记录滚动
    let lastScroll = 0;
    document.addEventListener('scroll', (e) => {
      const now = Date.now();
      if (now - lastScroll > 1000) {
        this.recordBehavior('scroll', {
          scrollY: window.scrollY,
          path: document.location.pathname
        });
        lastScroll = now;
      }
    });

    // 记录页面访问
    this.recordBehavior('page_visit', {
      path: document.location.pathname,
      referrer: document.referrer
    });

    // 页面关闭时记录访问时长
    window.addEventListener('beforeunload', () => {
      const duration = (new Date() - this.startTime) / 1000;
      this.recordBehavior('page_leave', {
        path: document.location.pathname,
        duration: duration
      });
    });
  }

  // 获取用户行为分析
  getBehaviorAnalysis() {
    return {
      totalBehaviors: this.behaviors.length,
      mostVisitedPages: this.getMostVisitedPages(),
      averageTimePerPage: this.getAverageTimePerPage(),
      commonClickAreas: this.getCommonClickAreas()
    };
  }

  // 获取最常访问的页面
  getMostVisitedPages() {
    const pageVisits = {};
    this.behaviors
      .filter(b => b.type === 'page_visit')
      .forEach(b => {
        pageVisits[b.data.path] = (pageVisits[b.data.path] || 0) + 1;
      });
    return pageVisits;
  }

  // 获取平均每页停留时间
  getAverageTimePerPage() {
    const pageDurations = {};
    this.behaviors
      .filter(b => b.type === 'page_leave')
      .forEach(b => {
        pageDurations[b.data.path] = b.data.duration;
      });
    return pageDurations;
  }

  // 获取常用点击区域
  getCommonClickAreas() {
    return this.behaviors
      .filter(b => b.type === 'click')
      .map(b => ({x: b.data.x, y: b.data.y}));
  }
}

// 初始化跟踪器
const tracker = new UserBehaviorTracker();

// 提供全局访问方法
window.getUserBehavior = () => tracker.getBehaviorAnalysis(); 