document.addEventListener('DOMContentLoaded', (event) => {
    const toggleMenuButton = document.getElementById('menu_media');
    const indexMenu = document.getElementById('index_menu');
    const overlay = document.getElementById('overlay');

    // 检查元素是否存在
    if (!toggleMenuButton || !indexMenu || !overlay) {
        console.error('页面中缺少必要的元素');
        return; // 提前返回，避免后续错误
    }

    // 初始化状态
    let isMenuVisible = false;

    // 点击折叠菜单按钮时的事件处理
    toggleMenuButton.addEventListener('click', () => {
        console.log('Toggle button clicked');
        isMenuVisible = !isMenuVisible;
        if (isMenuVisible) {
            console.log('Menu is now visible');
            indexMenu.style.display = 'block'; // 显示菜单
            setTimeout(() => {
                indexMenu.classList.add('visible'); // 添加 visible 类以触发动画
                overlay.style.display = 'block'; // 显示透明层  
            }, 10); // 小延迟以防止直接应用 visible 类导致动画失效
        } else {
            console.log('Menu is now hidden');
            indexMenu.classList.remove('visible'); // 移除 visible 类
            setTimeout(() => {
                indexMenu.style.display = 'none'; // 在动画结束后隐藏菜单
                overlay.style.display = 'none'; // 隐藏透明层
            }, 300); //与CSS动画时长匹配
        }
    });

    // 点击透明层时也可以关闭菜单
    indexMenu.addEventListener('click', () => {
        if (isMenuVisible) {
            console.log('Overlay clicked');
            isMenuVisible = false;
            indexMenu.classList.remove('visible'); // 移除 visible 类
            setTimeout(() => {
                indexMenu.style.display = 'none'; // 在动画结束后隐藏菜单
                overlay.style.display = 'none'; // 隐藏透明层
            }, 300); //与CSS动画时长匹配
        }
    });
});

$(document).ready(function() {
    // 读取 records.json 文件并显示最后一条记录
    $.getJSON('records.json', function(data) {
        if (data.length > 0) {
            var lastRecord = data[data.length - 1];
            $('#update-info strong').text('最近更新: ' + lastRecord.title);
            $('#update-time').text(lastRecord.date);
        }
    });

    // 设置1分钟后隐藏 update-info
    setTimeout(function() {
        $('#update-info').fadeOut();
    }, 60000);

    // 添加点击事件以隐藏 update-info
    $('#update-info').click(function() {
        $(this).fadeOut();
    });
});
