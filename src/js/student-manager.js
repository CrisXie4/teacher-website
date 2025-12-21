// 学生管理模块
const StudentManager = {
    // 存储学生数据的键名
    STORAGE_KEY: 'teacher_toolkit_students',
    
    // 学生列表
    students: [],
    
    // 初始化
    init: function() {
        this.loadStudents();
    },
    
    // 加载学生数据
    loadStudents: function() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.students = JSON.parse(stored);
            }
        } catch (e) {
            console.error('加载学生数据失败:', e);
            this.students = [];
        }
    },
    
    // 检查localStorage是否接近容量限制
    checkStorageQuota: function() {
        try {
            // 创建一个测试字符串来检测剩余空间
            const testKey = '__storage_test__';
            const testValue = 'x'.repeat(1024); // 1KB测试数据
            let quotaExceeded = false;
            
            // 尝试存储数据直到达到限制
            let i = 0;
            while (i < 10000) { // 限制测试次数
                try {
                    localStorage.setItem(testKey, testValue.repeat(i));
                    i++;
                } catch (e) {
                    if (e instanceof DOMException && 
                        (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                        quotaExceeded = true;
                        break;
                    } else {
                        throw e;
                    }
                }
            }
            
            // 清理测试数据
            localStorage.removeItem(testKey);
            
            return quotaExceeded;
        } catch (e) {
            console.error('检查存储配额时出错:', e);
            return false;
        }
    },
    
    // 保存学生数据
    saveStudents: function() {
        try {
            const data = JSON.stringify(this.students);
            localStorage.setItem(this.STORAGE_KEY, data);
        } catch (e) {
            // 处理不同类型的错误
            if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                console.error('localStorage容量已满，无法保存更多学生数据');
                // 可以在这里添加用户提示或其他处理逻辑
                // 例如，显示一个模态框提示用户清理数据
            } else {
                console.error('保存学生数据失败:', e);
            }
        }
    },
    
    // 解析学生输入，支持"学号，姓名"或"学号,姓名"格式
    parseStudentInput: function(id, name) {
        // 如果姓名包含学号信息（如"15，李四"），则自动分离
        if (!id && name.includes('，')) {
            const parts = name.split('，');
            if (parts.length === 2) {
                id = parts[0].trim();
                name = parts[1].trim();
            }
        } else if (!id && name.includes(',')) {
            const parts = name.split(',');
            if (parts.length === 2) {
                id = parts[0].trim();
                name = parts[1].trim();
            }
        }
        
        return { id: id.trim(), name: name.trim() };
    },
    
    // 添加学生
    addStudent: function(student) {
        // 解析学生输入
        const parsedStudent = this.parseStudentInput(student.id, student.name);
        
        // 检查输入有效性
        if (!parsedStudent.name) {
            return false;
        }
        
        // 检查是否已存在（去重逻辑）
        // 规则1: 如果提供了学号，且学号已存在，则认为是重复学生
        // 规则2: 如果没有学号，但姓名已存在且现有学生也没有学号，则认为是重复学生
        const exists = this.students.some(s => {
            // 如果当前学生有学号，且与现有学生的学号相同，则重复
            if (parsedStudent.id && s.id === parsedStudent.id) {
                return true;
            }
            // 如果当前学生没有学号，但姓名与现有学生相同，且现有学生也没有学号，则重复
            if (!parsedStudent.id && s.name === parsedStudent.name && !s.id) {
                return true;
            }
            return false;
        });
        
        if (!exists) {
            this.students.push(parsedStudent);
            this.saveStudents();
            return true;
        }
        return false;
    },
    
    // 批量添加学生
    addStudents: function(students) {
        let addedCount = 0;
        students.forEach(student => {
            if (this.addStudent(student)) {
                addedCount++;
            }
        });
        return addedCount;
    },
    
    // 删除学生
    removeStudent: function(index) {
        if (index >= 0 && index < this.students.length) {
            this.students.splice(index, 1);
            this.saveStudents();
            return true;
        }
        return false;
    },
    
    // 获取学生列表
    getStudents: function() {
        return [...this.students];
    },
    
    // 清空学生列表
    clearStudents: function() {
        this.students = [];
        this.saveStudents();
    },
    
    // HTML转义函数，防止XSS攻击
    escapeHtml: function(text) {
        if (typeof text !== 'string') return text;
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },
    
    // 从CSV文本解析学生数据
    parseCSV: function(csvText) {
        const lines = csvText.trim().split('\n');
        const students = [];
        
        // 跳过标题行（如果有）
        let startIndex = 0;
        if (lines[0].includes('学号') || lines[0].includes('姓名') || lines[0].includes('ID') || lines[0].includes('Name')) {
            startIndex = 1;
        }
        
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // 支持逗号或制表符分隔
            const parts = line.includes(',') ? line.split(',') : line.split('\t');
            let id = '';
            let name = '';
            
            if (parts.length >= 2) {
                // 两列或以上的情况：第一列为学号，第二列为姓名
                id = parts[0] ? this.escapeHtml(parts[0].trim()) : '';
                name = parts[1] ? this.escapeHtml(parts[1].trim()) : '';
            } else if (parts.length === 1) {
                // 只有一列的情况：作为姓名处理
                name = parts[0] ? this.escapeHtml(parts[0].trim()) : '';
            }
            
            if (name) {
                students.push({
                    id: id,
                    name: name
                });
            }
        }
        
        return students;
    },
    
    // 从JSON文本解析学生数据
    parseJSON: function(jsonText) {
        try {
            const data = JSON.parse(jsonText);
            const students = [];
            
            // 支持两种JSON格式：
            // 1. 数组格式：[{id: "001", name: "张三"}, {id: "002", name: "李四"}]
            // 2. 对象格式：{"001": "张三", "002": "李四"}
            
            if (Array.isArray(data)) {
                // 数组格式
                data.forEach(item => {
                    if (typeof item === 'object' && item.name) {
                        students.push({
                            id: item.id ? this.escapeHtml(item.id.toString().trim()) : '',
                            name: this.escapeHtml(item.name.toString().trim())
                        });
                    }
                });
            } else if (typeof data === 'object' && data !== null) {
                // 对象格式
                Object.keys(data).forEach(key => {
                    if (data[key]) {
                        students.push({
                            id: this.escapeHtml(key.toString().trim()),
                            name: this.escapeHtml(data[key].toString().trim())
                        });
                    }
                });
            }
            
            return students;
        } catch (e) {
            throw new Error('JSON格式错误：' + e.message);
        }
    }
};