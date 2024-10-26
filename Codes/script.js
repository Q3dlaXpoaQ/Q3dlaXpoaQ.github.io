function loadFile(fileName) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络错误');
            }
            return response.text();
        })
        .then(data => {
            const codeBlock = document.getElementById('code-block');
            codeBlock.textContent = data;
            hljs.highlightElement(codeBlock); // 高亮代码
            hljs.lineNumbersBlock(codeBlock); // 初始化行号
            document.getElementById('current-file').textContent = fileName; // 更新当前文件名
        })
        .catch(error => {
            console.error('加载文件失败:', error);
            document.getElementById('code-block').textContent = '加载文件失败';
            document.getElementById('current-file').textContent = '未选择文件'; // 重置当前文件名
        });
}

function copyCode() {
    const codeBlock = document.getElementById('code-block');
    navigator.clipboard.writeText(codeBlock.textContent)
        .then(() => {
            alert('代码已复制到剪贴板');
        })
        .catch(err => {
            console.error('复制失败:', err);
        });
}
