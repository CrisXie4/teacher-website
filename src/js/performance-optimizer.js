/**
 * 性能优化模块
 * 提供页面可见性检测、动画暂停等性能优化功能
 */

(function() {
    'use strict';

    const DEBUG = (() => {
        try {
            return localStorage.getItem('debug') === 'true';
        } catch {
            return false;
        }
    })();

    // 页面可见性检测
    const PerformanceOptimizer = {
        isPageVisible: true,
        visibilityListeners: [],
        intervals: new Map(),
        animationFrames: new Map(),

        /**
         * 初始化性能优化器
         */
        init: function() {
            // 监听页面可见性变化
            document.addEventListener('visibilitychange', () => {
                this.isPageVisible = !document.hidden;
                this.handleVisibilityChange();
            });

            // 监听窗口失焦
            window.addEventListener('blur', () => {
                this.isPageVisible = false;
                this.handleVisibilityChange();
            });

            // 监听窗口获焦
            window.addEventListener('focus', () => {
                this.isPageVisible = true;
                this.handleVisibilityChange();
            });
        },

        /**
         * 处理可见性变化
         */
        handleVisibilityChange: function() {
            // 触发所有注册的监听器
            this.visibilityListeners.forEach(callback => {
                callback(this.isPageVisible);
            });

            // 控制所有注册的interval
            if (!this.isPageVisible) {
                this.pauseAllIntervals();
            } else {
                this.resumeAllIntervals();
            }
        },

        /**
         * 注册可见性变化监听器
         * @param {Function} callback - 回调函数，接收isVisible参数
         */
        onVisibilityChange: function(callback) {
            this.visibilityListeners.push(callback);
        },

        /**
         * 优化的setInterval - 页面隐藏时自动暂停
         * @param {Function} callback - 回调函数
         * @param {number} delay - 延迟时间（毫秒）
         * @returns {string} - interval ID
         */
        setOptimizedInterval: function(callback, delay) {
            const id = 'interval_' + Date.now() + '_' + Math.random();
            const intervalData = {
                callback: callback,
                delay: delay,
                intervalId: null,
                isPaused: false
            };

            // 立即启动interval
            intervalData.intervalId = setInterval(callback, delay);
            this.intervals.set(id, intervalData);

            return id;
        },

        /**
         * 清除优化的interval
         * @param {string} id - interval ID
         */
        clearOptimizedInterval: function(id) {
            const intervalData = this.intervals.get(id);
            if (intervalData && intervalData.intervalId) {
                clearInterval(intervalData.intervalId);
                this.intervals.delete(id);
            }
        },

        /**
         * 暂停所有intervals
         */
        pauseAllIntervals: function() {
            this.intervals.forEach((data, id) => {
                if (data.intervalId && !data.isPaused) {
                    clearInterval(data.intervalId);
                    data.intervalId = null;
                    data.isPaused = true;
                }
            });
        },

        /**
         * 恢复所有intervals
         */
        resumeAllIntervals: function() {
            this.intervals.forEach((data, id) => {
                if (data.isPaused) {
                    data.intervalId = setInterval(data.callback, data.delay);
                    data.isPaused = false;
                }
            });
        },

        /**
         * 节流函数 - 限制函数执行频率
         * @param {Function} func - 要节流的函数
         * @param {number} wait - 等待时间（毫秒）
         * @returns {Function} - 节流后的函数
         */
        throttle: function(func, wait) {
            let timeout = null;
            let previous = 0;

            return function(...args) {
                const now = Date.now();
                const remaining = wait - (now - previous);

                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    previous = now;
                    func.apply(this, args);
                } else if (!timeout) {
                    timeout = setTimeout(() => {
                        previous = Date.now();
                        timeout = null;
                        func.apply(this, args);
                    }, remaining);
                }
            };
        },

        /**
         * 防抖函数 - 延迟执行
         * @param {Function} func - 要防抖的函数
         * @param {number} wait - 等待时间（毫秒）
         * @returns {Function} - 防抖后的函数
         */
        debounce: function(func, wait) {
            let timeout = null;

            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(this, args);
                }, wait);
            };
        },

        /**
         * 优化的requestAnimationFrame - 页面隐藏时自动暂停
         * @param {Function} callback - 动画回调
         * @returns {string} - animation ID
         */
        requestOptimizedAnimation: function(callback) {
            const id = 'animation_' + Date.now() + '_' + Math.random();
            const animationData = {
                callback: callback,
                frameId: null,
                isRunning: true
            };

            const animate = () => {
                if (this.isPageVisible && animationData.isRunning) {
                    callback();
                    animationData.frameId = requestAnimationFrame(animate);
                } else if (animationData.isRunning) {
                    // 页面隐藏时，继续保持动画循环但不执行回调
                    animationData.frameId = requestAnimationFrame(animate);
                }
            };

            animationData.frameId = requestAnimationFrame(animate);
            this.animationFrames.set(id, animationData);

            return id;
        },

        /**
         * 取消优化的动画
         * @param {string} id - animation ID
         */
        cancelOptimizedAnimation: function(id) {
            const animationData = this.animationFrames.get(id);
            if (animationData) {
                animationData.isRunning = false;
                if (animationData.frameId) {
                    cancelAnimationFrame(animationData.frameId);
                }
                this.animationFrames.delete(id);
            }
        },

        /**
         * 内存使用监控
         */
        memoryMonitor: {
            isSupported: 'memory' in performance,

            getMemoryInfo: function() {
                if (!this.isSupported) {
                    return null;
                }

                const memory = performance.memory;
                return {
                    usedJSHeapSize: memory.usedJSHeapSize,
                    totalJSHeapSize: memory.totalJSHeapSize,
                    jsHeapSizeLimit: memory.jsHeapSizeLimit,
                    usedPercent: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100),
                    timestamp: Date.now()
                };
            },

            startMonitoring: function(callback, interval = 5000) {
                if (!this.isSupported) {
                    console.warn('内存监控不支持当前浏览器');
                    return null;
                }

                return PerformanceOptimizer.setOptimizedInterval(() => {
                    const memoryInfo = this.getMemoryInfo();
                    if (memoryInfo && callback) {
                        callback(memoryInfo);
                    }
                }, interval);
            },

            checkMemoryPressure: function() {
                const info = this.getMemoryInfo();
                if (!info) return false;

                // 如果内存使用超过80%，认为有内存压力
                return info.usedPercent > 80;
            }
        },

        /**
         * 懒加载管理器
         */
        lazyLoader: {
            observer: null,
            loadedElements: new Set(),

            init: function() {
                if (!('IntersectionObserver' in window)) {
                    console.warn('浏览器不支持IntersectionObserver，懒加载功能不可用');
                    return;
                }

                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadElement(entry.target);
                        }
                    });
                }, {
                    rootMargin: '50px 0px',
                    threshold: 0.1
                });
            },

            observe: function(element) {
                if (!this.observer) {
                    this.init();
                }

                if (this.observer && !this.loadedElements.has(element)) {
                    this.observer.observe(element);
                }
            },

            loadElement: function(element) {
                if (this.loadedElements.has(element)) {
                    return;
                }

                // 处理图片懒加载
                if (element.tagName === 'IMG' && element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }

                // 处理背景图片懒加载
                if (element.dataset.bgSrc) {
                    element.style.backgroundImage = `url(${element.dataset.bgSrc})`;
                    element.removeAttribute('data-bg-src');
                }

                // 处理iframe懒加载
                if (element.tagName === 'IFRAME' && element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }

                this.loadedElements.add(element);
                this.observer.unobserve(element);

                // 触发自定义加载事件
                element.dispatchEvent(new CustomEvent('lazyloaded'));
            },

            loadAll: function() {
                const lazyElements = document.querySelectorAll('[data-src], [data-bg-src]');
                lazyElements.forEach(element => this.loadElement(element));
            }
        },

        /**
         * 图片优化器
         */
        imageOptimizer: {
            // 压缩图片
            compressImage: function(file, quality = 0.8, maxWidth = 1920, maxHeight = 1080) {
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();

                    img.onload = function() {
                        // 计算新尺寸
                        let { width, height } = img;

                        if (width > maxWidth || height > maxHeight) {
                            const ratio = Math.min(maxWidth / width, maxHeight / height);
                            width *= ratio;
                            height *= ratio;
                        }

                        canvas.width = width;
                        canvas.height = height;

                        // 绘制并压缩
                        ctx.drawImage(img, 0, 0, width, height);

                        canvas.toBlob(resolve, 'image/jpeg', quality);
                    };

                    img.onerror = reject;
                    img.src = URL.createObjectURL(file);
                });
            },

            // 转换为WebP格式（如果支持）
            convertToWebP: function(file, quality = 0.8) {
                return new Promise((resolve, reject) => {
                    // 检查浏览器是否支持WebP
                    const canvas = document.createElement('canvas');
                    const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

                    if (!webpSupported) {
                        resolve(file); // 不支持WebP，返回原文件
                        return;
                    }

                    const ctx = canvas.getContext('2d');
                    const img = new Image();

                    img.onload = function() {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);

                        canvas.toBlob(resolve, 'image/webp', quality);
                    };

                    img.onerror = reject;
                    img.src = URL.createObjectURL(file);
                });
            },

            // 生成响应式图片尺寸
            generateResponsiveSizes: function(file, sizes = [480, 768, 1024, 1920]) {
                return Promise.all(
                    sizes.map(size => this.resizeImage(file, size))
                );
            },

            resizeImage: function(file, maxSize) {
                return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();

                    img.onload = function() {
                        let { width, height } = img;

                        if (width > maxSize || height > maxSize) {
                            const ratio = Math.min(maxSize / width, maxSize / height);
                            width *= ratio;
                            height *= ratio;
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        canvas.toBlob(blob => {
                            resolve({
                                size: maxSize,
                                blob: blob,
                                width: width,
                                height: height
                            });
                        }, 'image/jpeg', 0.8);
                    };

                    img.onerror = reject;
                    img.src = URL.createObjectURL(file);
                });
            }
        },

        /**
         * 缓存管理器
         */
        cacheManager: {
            cache: new Map(),
            maxSize: 50, // 最大缓存项数
            maxAge: 30 * 60 * 1000, // 30分钟过期

            set: function(key, value, customMaxAge) {
                const item = {
                    value: value,
                    timestamp: Date.now(),
                    maxAge: customMaxAge || this.maxAge
                };

                this.cache.set(key, item);
                this.cleanup();
            },

            get: function(key) {
                const item = this.cache.get(key);
                if (!item) {
                    return null;
                }

                // 检查是否过期
                if (Date.now() - item.timestamp > item.maxAge) {
                    this.cache.delete(key);
                    return null;
                }

                return item.value;
            },

            has: function(key) {
                return this.get(key) !== null;
            },

            delete: function(key) {
                return this.cache.delete(key);
            },

            clear: function() {
                this.cache.clear();
            },

            cleanup: function() {
                const now = Date.now();

                // 删除过期项
                for (const [key, item] of this.cache.entries()) {
                    if (now - item.timestamp > item.maxAge) {
                        this.cache.delete(key);
                    }
                }

                // 如果缓存项过多，删除最旧的项
                if (this.cache.size > this.maxSize) {
                    const entries = Array.from(this.cache.entries());
                    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

                    const toDelete = entries.slice(0, this.cache.size - this.maxSize);
                    toDelete.forEach(([key]) => this.cache.delete(key));
                }
            },

            getStats: function() {
                return {
                    size: this.cache.size,
                    maxSize: this.maxSize,
                    maxAge: this.maxAge,
                    keys: Array.from(this.cache.keys())
                };
            }
        },

        /**
         * 网络状态检测
         */
        networkMonitor: {
            isOnline: navigator.onLine,
            connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection,
            listeners: [],

            init: function() {
                // 监听在线/离线状态
                window.addEventListener('online', () => {
                    this.isOnline = true;
                    this.notifyListeners('online');
                });

                window.addEventListener('offline', () => {
                    this.isOnline = false;
                    this.notifyListeners('offline');
                });

                // 监听网络连接变化
                if (this.connection) {
                    this.connection.addEventListener('change', () => {
                        this.notifyListeners('connection-change', this.getConnectionInfo());
                    });
                }
            },

            getConnectionInfo: function() {
                if (!this.connection) {
                    return {
                        online: this.isOnline,
                        type: 'unknown',
                        effectiveType: 'unknown',
                        downlink: null,
                        rtt: null
                    };
                }

                return {
                    online: this.isOnline,
                    type: this.connection.type || 'unknown',
                    effectiveType: this.connection.effectiveType || 'unknown',
                    downlink: this.connection.downlink || null,
                    rtt: this.connection.rtt || null,
                    saveData: this.connection.saveData || false
                };
            },

            isSlowConnection: function() {
                if (!this.connection) {
                    return false;
                }

                return this.connection.effectiveType === 'slow-2g' ||
                       this.connection.effectiveType === '2g' ||
                       this.connection.saveData === true;
            },

            addListener: function(callback) {
                this.listeners.push(callback);
            },

            removeListener: function(callback) {
                const index = this.listeners.indexOf(callback);
                if (index > -1) {
                    this.listeners.splice(index, 1);
                }
            },

            notifyListeners: function(event, data) {
                this.listeners.forEach(callback => {
                    try {
                        callback(event, data);
                    } catch (e) {
                        console.error('网络状态监听器执行失败:', e);
                    }
                });
            }
        },

        /**
         * 性能监控和报告
         */
        performanceMonitor: {
            metrics: [],
            maxMetrics: 100,

            recordMetric: function(name, value, type = 'custom') {
                const metric = {
                    name: name,
                    value: value,
                    type: type,
                    timestamp: Date.now()
                };

                this.metrics.push(metric);

                // 保持最大数量限制
                if (this.metrics.length > this.maxMetrics) {
                    this.metrics.shift();
                }
            },

            getMetrics: function(name, limit = 10) {
                let filtered = this.metrics;

                if (name) {
                    filtered = this.metrics.filter(m => m.name === name);
                }

                return filtered.slice(-limit);
            },

            getAverageMetric: function(name) {
                const metrics = this.getMetrics(name);
                if (metrics.length === 0) return null;

                const sum = metrics.reduce((acc, m) => acc + m.value, 0);
                return sum / metrics.length;
            },

            generateReport: function() {
                const memoryInfo = PerformanceOptimizer.memoryMonitor.getMemoryInfo();
                const networkInfo = PerformanceOptimizer.networkMonitor.getConnectionInfo();
                const cacheStats = PerformanceOptimizer.cacheManager.getStats();

                return {
                    timestamp: Date.now(),
                    memory: memoryInfo,
                    network: networkInfo,
                    cache: cacheStats,
                    customMetrics: this.metrics.slice(-20), // 最近20个指标
                    performance: {
                        navigation: performance.getEntriesByType('navigation')[0],
                        paint: performance.getEntriesByType('paint'),
                        resource: performance.getEntriesByType('resource').slice(-10)
                    }
                };
            }
        }
    };

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            PerformanceOptimizer.init();
            PerformanceOptimizer.networkMonitor.init();

            // 启动内存监控（如果支持）
            if (PerformanceOptimizer.memoryMonitor.isSupported) {
                PerformanceOptimizer.memoryMonitor.startMonitoring((memoryInfo) => {
                    if (memoryInfo.usedPercent > 90) {
                        console.warn('内存使用率过高:', memoryInfo.usedPercent + '%');
                        // 可以在这里触发垃圾回收或清理缓存
                        PerformanceOptimizer.cacheManager.cleanup();
                    }
                });
            }

            // 自动启用懒加载
            const lazyElements = document.querySelectorAll('[data-src], [data-bg-src]');
            lazyElements.forEach(element => {
                PerformanceOptimizer.lazyLoader.observe(element);
            });

            // 监听网络状态变化
            PerformanceOptimizer.networkMonitor.addListener((event, data) => {
                if (DEBUG) console.log('网络状态变化:', event, data);
                if (event === 'offline') {
                    console.warn('网络连接已断开');
                } else if (event === 'online') {
                    if (DEBUG) console.log('网络连接已恢复');
                }
            });
        });
    } else {
        PerformanceOptimizer.init();
        PerformanceOptimizer.networkMonitor.init();

        // 启动内存监控
        if (PerformanceOptimizer.memoryMonitor.isSupported) {
            PerformanceOptimizer.memoryMonitor.startMonitoring((memoryInfo) => {
                if (memoryInfo.usedPercent > 90) {
                    console.warn('内存使用率过高:', memoryInfo.usedPercent + '%');
                    PerformanceOptimizer.cacheManager.cleanup();
                }
            });
        }

        // 自动启用懒加载
        const lazyElements = document.querySelectorAll('[data-src], [data-bg-src]');
        lazyElements.forEach(element => {
            PerformanceOptimizer.lazyLoader.observe(element);
        });

        // 监听网络状态变化
        PerformanceOptimizer.networkMonitor.addListener((event, data) => {
            if (DEBUG) console.log('网络状态变化:', event, data);
        });
    }

    // 导出到全局
    window.PerformanceOptimizer = PerformanceOptimizer;
})();
