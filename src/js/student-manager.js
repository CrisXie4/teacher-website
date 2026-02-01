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

            // 使用二分查找法更高效地检测存储限制
            let low = 0;
            let high = 5000; // 最大5MB测试
            let maxSize = 0;

            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                try {
                    const testData = testValue.repeat(mid);
                    localStorage.setItem(testKey, testData);
                    localStorage.removeItem(testKey); // 立即清理
                    maxSize = mid;
                    low = mid + 1;
                } catch (e) {
                    if (e instanceof DOMException &&
                        (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                        high = mid - 1;
                        quotaExceeded = true;
                    } else {
                        throw e;
                    }
                }
            }

            // 如果可用空间小于100KB，认为接近限制
            return maxSize < 100;
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
        // 确保输入参数不为null或undefined
        id = id || '';
        name = name || '';

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
            // 输入验证
            if (!jsonText || typeof jsonText !== 'string') {
                throw new Error('输入的JSON文本无效');
            }

            // 清理输入文本
            const cleanedText = jsonText.trim();
            if (!cleanedText) {
                throw new Error('JSON文本不能为空');
            }

            const data = JSON.parse(cleanedText);
            const students = [];

            // 支持两种JSON格式：
            // 1. 数组格式：[{id: "001", name: "张三"}, {id: "002", name: "李四"}]
            // 2. 对象格式：{"001": "张三", "002": "李四"}

            if (Array.isArray(data)) {
                // 数组格式
                data.forEach((item, index) => {
                    if (typeof item === 'object' && item !== null && item.name) {
                        const id = item.id ? String(item.id).trim() : '';
                        const name = String(item.name).trim();

                        if (name) {
                            students.push({
                                id: this.escapeHtml(id),
                                name: this.escapeHtml(name)
                            });
                        }
                    } else if (typeof item === 'string' && item.trim()) {
                        // 支持纯字符串数组
                        students.push({
                            id: '',
                            name: this.escapeHtml(item.trim())
                        });
                    }
                });
            } else if (typeof data === 'object' && data !== null) {
                // 对象格式
                Object.keys(data).forEach(key => {
                    const value = data[key];
                    if (value && (typeof value === 'string' || typeof value === 'number')) {
                        students.push({
                            id: this.escapeHtml(String(key).trim()),
                            name: this.escapeHtml(String(value).trim())
                        });
                    }
                });
            } else {
                throw new Error('不支持的JSON格式，请使用数组或对象格式');
            }

            return students;
        } catch (e) {
            if (e instanceof SyntaxError) {
                throw new Error('JSON格式错误：' + e.message);
            }
        }
    },

    // 导出学生数据为CSV格式
    exportToCSV: function() {
        if (this.students.length === 0) {
            throw new Error('没有学生数据可导出');
        }

        const headers = ['学号', '姓名'];
        const csvContent = [
            headers.join(','),
            ...this.students.map(student =>
                `"${student.id || ''}","${student.name || ''}"`
            )
        ].join('\n');

        return csvContent;
    },

    // 导出学生数据为JSON格式
    exportToJSON: function() {
        if (this.students.length === 0) {
            throw new Error('没有学生数据可导出');
        }

        return JSON.stringify(this.students, null, 2);
    },

    // 创建并下载文件
    downloadFile: function(content, filename, mimeType = 'text/plain') {
        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = filename;
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 清理URL对象
            setTimeout(() => URL.revokeObjectURL(url), 100);

            return true;
        } catch (e) {
            console.error('下载文件失败:', e);
            return false;
        }
    },

    // 导出为Excel格式（CSV兼容）
    exportToExcel: function() {
        try {
            const csvContent = this.exportToCSV();
            const filename = `学生名单_${new Date().toISOString().split('T')[0]}.csv`;
            return this.downloadFile(csvContent, filename, 'text/csv;charset=utf-8');
        } catch (e) {
            console.error('导出Excel失败:', e);
            return false;
        }
    },

    // 备份所有数据
    backupData: function() {
        try {
            const backupData = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                students: this.students,
                totalCount: this.students.length
            };

            const jsonContent = JSON.stringify(backupData, null, 2);
            const filename = `学生数据备份_${new Date().toISOString().split('T')[0]}.json`;

            return this.downloadFile(jsonContent, filename, 'application/json');
        } catch (e) {
            console.error('备份数据失败:', e);
            return false;
        }
    },

    // 从备份文件恢复数据
    restoreFromBackup: function(backupText) {
        try {
            if (!backupText || typeof backupText !== 'string') {
                throw new Error('备份数据无效');
            }

            const backupData = JSON.parse(backupText.trim());

            // 验证备份数据格式
            if (!backupData.students || !Array.isArray(backupData.students)) {
                throw new Error('备份文件格式不正确');
            }

            // 验证学生数据格式
            const validStudents = [];
            backupData.students.forEach((student, index) => {
                if (typeof student === 'object' && student !== null && student.name) {
                    validStudents.push({
                        id: student.id ? this.escapeHtml(String(student.id).trim()) : '',
                        name: this.escapeHtml(String(student.name).trim())
                    });
                }
            });

            if (validStudents.length === 0) {
                throw new Error('备份文件中没有有效的学生数据');
            }

            // 询问用户是否要覆盖现有数据
            const shouldOverwrite = this.students.length === 0 ||
                confirm(`当前有${this.students.length}个学生，备份文件包含${validStudents.length}个学生。\n是否要覆盖现有数据？`);

            if (shouldOverwrite) {
                this.students = validStudents;
                this.saveStudents();
                return {
                    success: true,
                    message: `成功恢复${validStudents.length}个学生数据`,
                    count: validStudents.length
                };
            } else {
                return {
                    success: false,
                    message: '用户取消了数据恢复操作',
                    count: 0
                };
            }

        } catch (e) {
            return {
                success: false,
                message: '恢复数据失败：' + e.message,
                count: 0
            };
        }
    },

    // 批量操作：删除选中的学生
    batchRemoveStudents: function(indices) {
        if (!Array.isArray(indices) || indices.length === 0) {
            return { success: false, message: '没有选择要删除的学生' };
        }

        try {
            // 按索引降序排列，避免删除时索引变化
            const sortedIndices = [...indices].sort((a, b) => b - a);
            let removedCount = 0;

            sortedIndices.forEach(index => {
                if (index >= 0 && index < this.students.length) {
                    this.students.splice(index, 1);
                    removedCount++;
                }
            });

            if (removedCount > 0) {
                this.saveStudents();
                return {
                    success: true,
                    message: `成功删除${removedCount}个学生`,
                    count: removedCount
                };
            } else {
                return { success: false, message: '没有有效的学生被删除' };
            }

        } catch (e) {
            console.error('批量删除学生失败:', e);
            return { success: false, message: '批量删除失败：' + e.message };
        }
    },

    // 获取存储使用情况统计
    getStorageStats: function() {
        try {
            const dataSize = JSON.stringify(this.students).length;
            const totalStudents = this.students.length;
            const studentsWithId = this.students.filter(s => s.id).length;
            const studentsWithoutId = totalStudents - studentsWithId;

            return {
                totalStudents,
                studentsWithId,
                studentsWithoutId,
                dataSize,
                dataSizeKB: Math.round(dataSize / 1024 * 100) / 100,
                isNearQuota: this.checkStorageQuota()
            };
        } catch (e) {
            console.error('获取存储统计失败:', e);
            return null;
        }
    }
};