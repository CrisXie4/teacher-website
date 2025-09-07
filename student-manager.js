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
    
    // 保存学生数据
    saveStudents: function() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.students));
        } catch (e) {
            console.error('保存学生数据失败:', e);
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
        
        // 检查是否已存在（根据学号或姓名）
        const exists = this.students.some(s => 
            (parsedStudent.id && s.id === parsedStudent.id) || 
            s.name === parsedStudent.name
        );
        
        if (!exists && parsedStudent.name) {
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
    
    // 从CSV文本解析学生数据
    parseCSV: function(csvText) {
        const lines = csvText.trim().split('\n');
        const students = [];
        
        // 跳过标题行（如果有）
        let startIndex = 0;
        if (lines[0].includes('学号') || lines[0].includes('姓名')) {
            startIndex = 1;
        }
        
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // 支持逗号或制表符分隔
            const parts = line.includes(',') ? line.split(',') : line.split('\t');
            const id = parts[0] ? parts[0].trim() : '';
            const name = parts[1] ? parts[1].trim() : (parts[0] ? parts[0].trim() : '');
            
            if (name) {
                students.push({
                    id: id,
                    name: name
                });
            }
        }
        
        return students;
    }
};