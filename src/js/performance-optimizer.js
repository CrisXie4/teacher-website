/**
 * 性能优化模块
 * 提供页面可见性检测、动画暂停等性能优化功能
 */

(function() {
    'use strict';

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
        }
    };

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            PerformanceOptimizer.init();
        });
    } else {
        PerformanceOptimizer.init();
    }

    // 导出到全局
    window.PerformanceOptimizer = PerformanceOptimizer;
})();
