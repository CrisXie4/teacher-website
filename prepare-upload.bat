@echo off
echo 正在为完整教师工具箱准备上传文件...

:: 创建上传目录
mkdir upload-package 2>nul

:: 复制核心服务器文件
echo 复制服务器文件...
copy server.js upload-package\
copy supabase-config.js upload-package\
copy package.json upload-package\
copy vercel.json upload-package\

:: 复制主要页面
echo 复制主要页面...
copy index.html upload-package\
copy teacher-camera.html upload-package\
copy viewer.html upload-package\
copy teacher-view.html upload-package\

:: 复制 JavaScript 文件
echo 复制 JavaScript 文件...
copy teacher-camera.js upload-package\
copy teacher-view.js upload-package\
copy student-manager.js upload-package\
copy data-test.js upload-package\
copy sw.js upload-package\

:: 复制所有工具页面
echo 复制工具页面...
copy timer.html upload-package\
copy whiteboard.html upload-package\
copy roll-call.html upload-package\
copy grouping.html upload-package\
copy classroom-tracker.html upload-package\
copy math-generator.html upload-package\
copy copybook-generator.html upload-package\
copy handwriting-generator.html upload-package\
copy sound-detector.html upload-package\
copy 3d-viewer.html upload-package\
copy new-features.html upload-package\
copy donation.html upload-package\
copy test-data-sync.html upload-package\

:: 复制样式和资源文件
echo 复制样式和资源文件...
copy styles.css upload-package\
copy manifest.json upload-package\
copy briefcase-192x192.png upload-package\
copy briefcase-512x512.png upload-package\
copy basic-alarm-ringtone.mp3 upload-package\
copy 1.png upload-package\ 2>nul
copy 2.jpg upload-package\ 2>nul

:: 复制文档文件
echo 复制文档文件...
copy README.md upload-package\ 2>nul
copy LICENSE upload-package\ 2>nul
copy sitemap.xml upload-package\ 2>nul

echo.
echo ================================
echo 文件打包完成！
echo 上传文件夹：upload-package
echo.
echo 需要配置的环境变量：
echo - SUPABASE_URL
echo - SUPABASE_ANON_KEY
echo ================================

pause