function rendering_forLogs() {
    window.onload = function () {
        var url = "libraries/datas.json"
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            var delay=0
            var json = JSON.parse(request.responseText).logs;
            for (var listnumber in json) {
                let article = document.createElement("article");
                let p = document.createElement("p");
                let div = document.createElement("div");
                p.innerHTML = json[listnumber]["log"];
                div.innerHTML = "--" + json[listnumber]["time"];
                document.body.append(article);
                article.insertAdjacentElement("afterbegin", p);
                article.style.animationDelay=delay.toString()+'s'
                article.insertAdjacentElement("beforeend", div);
                delay+=0.06+''
            };

        }
    }
}

function rendering_forRecord() {
    window.onload = function () {
        var url = "libraries/datas.json"
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            var json = JSON.parse(request.responseText).record;
            var delay=0;
            for (var listnumber in json) {
                let article = document.createElement("article");
                let p = document.createElement("p");
                let div = document.createElement("div");
                div.innerHTML = json[listnumber]["time"];
                document.body.append(article);
                article.insertAdjacentElement("afterbegin", p);
                article.insertAdjacentElement("afterbegin", div);
                article.style.animationDelay=delay.toString()+'s'
                if (json[listnumber]["see_more"] != null) {
                    let now_number = listnumber;
                    let link_div = document.createElement("div");
                    link_div.innerHTML = "----→";
                    article.title = "查看详情";
                    article.classList.add('square_sliding')
                    article.onmousemove = function () {
                        document.body.style.cursor = "pointer"
                    };
                    article.onmouseout = function () {
                        document.body.style.cursor = "auto";
                    };
                    article.insertAdjacentElement("beforeend", link_div);
                    article.onclick = function () {
                        window.open('record.html');
                        localStorage.setItem("record_name", json[now_number]["see_more"]);
                    };
                };
                delay+=0.06;
            };
        }
    }

}

function rendering_forRecord_Pages() {
    var record_name = null;
    if (sessionStorage.getItem("record_name") != null) {
        record_name = sessionStorage.getItem('record_name');
    } else {
        record_name = localStorage.getItem('record_name');
        sessionStorage.setItem('record_name', record_name);
        localStorage.removeItem("record_name");
    };
    window.onload = function () {
        var url = "libraries/records.json";
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            var json = JSON.parse(request.responseText)[record_name][0];
            document.title = json["title"];
            let title = document.createElement("h1")
            title.innerHTML = json["title"];
            document.body.appendChild(title);
            for (var text_number in json["text"]) {
                let p = document.createElement("p");
                p.innerHTML = json["text"][text_number];
                p.id = "p" + text_number;
                document.body.appendChild(p);
            };
            for (var img_number in json["img"]) {
                let img = document.createElement("img");
                img.src = json["img"][img_number]["img_url"];
                let br=document.createElement('br')
                img.onclick = function () {
                    window.open(json["img"][img_number]["img_url"]);
                };
                img.onmousemove = function () {
                    document.body.style.cursor = "pointer";
                };
                img.onmouseout = function () {
                    document.body.style.cursor = "auto";
                };
                let pos_p = document.getElementById("p" + json["img"][img_number]["postion"]);
                document.body.insertBefore(br, pos_p.nextSibling);
                document.body.insertBefore(img, pos_p.nextSibling);
            }
        }
    }
}

function recordtime() {
    const Toast = Swal.mixin({
        width: 470,
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
    })
    window.onload = function () {
        var json;
        var request = new XMLHttpRequest();
        request.open("get", "libraries/datas.json");
        request.send(null);
        request.onload = function () {
            json = JSON.parse(request.responseText).update_time[0];
            let now_time = new Date();
            console.log(now_time.toString().slice(0, 10));
            let last_update_date = new Date(json["time"]);
            let last_time = new Date(localStorage.getItem('last_time'));
            console.log(now_time);
            console.log(last_update_date);
            console.log(last_time);
            if (localStorage.getItem('last_time') != null) {
                if (last_update_date > last_time) {
                    Toast.fire({
                        title: 'Welcome baak,this website has been updated'
                    })
                } else {
                    Toast.fire({
                        title: 'Welcome back'
                    })
                }
                localStorage.setItem("last_time", now_time);
            } else {
                Toast.fire({
                    title: 'Welcome to my website'
                })
                localStorage.setItem("last_time", now_time);
            }
        };
    }

}

function rendering_forDownload() {
    if (localStorage.getItem('Download_Api') == null) {
        $.get("https://api.github.com/repos/Q3dlaXpoaQ/Cloud/commits", function (data1) {
            $.get(data1[0]['commit']['tree']['url'],function (data2){
                CreateDownload(data2);
                localStorage.setItem('Download_Api', JSON.stringify(data2))
                console.log('use api')
            })

        })
    } else {
        CreateDownload(JSON.parse(localStorage.getItem('Download_Api')));
        console.log('use localStorage')
    }

}


async function LoginCloud() {
    window.onload = async function () {
        if (localStorage.getItem('Is_Login') != 'true') {
            var {
                value: input_password
            } = await Swal.fire({
                title: '请输入管理员密码',
                input: 'password',
                inputPlaceholder: '请输入管理员密码',
                inputAttributes: {
                    maxlength: 30,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                }
            })
            let now_time = new Date();
            now_time = now_time.toString();
            if (input_password === null) {
                window.close();
            }
            if (input_password === now_time.slice(0, 10) || input_password === "I'm developer") {
                rendering_forDownload();
                localStorage.setItem('Is_Login', 'true')
            } else {
                window.close();
            }
        } else {
            rendering_forDownload();
        }

    }

}

function Update_Cloud() {
    localStorage.removeItem('Download_Api');
    location.reload();
}

function CreateDownload(data) {
    var info_json = data["tree"];
    for (file_number in info_json) {
        let num = file_number
        let article = document.createElement("article");
        let p = document.createElement("p");
        let a = document.createElement("a");
        let br = document.createElement("br");
        let div = document.createElement("div")


        a.innerHTML = "下载";
        a.setAttribute('href', "javascript:void(0);")
        a.onclick = function () {
            let a = document.createElement("a");
            a.style.display = 'none';
            a.href = "https://gitee.com/q3dlaxpoaq/Cloud/releases/download/Cloud/" + info_json[num]['path']
            a.download = info_json[num]['path'];
            document.body.appendChild(a)
            a.click();
            document.body.removeChild(a);
        }
        p.innerHTML = info_json[num]["path"]


        document.body.append(article);
        article.insertAdjacentElement("beforeend", p);
        article.insertAdjacentElement("beforeend", div)
        div.insertAdjacentElement("beforeend", a)
        div.insertAdjacentElement("beforeend", br)
    }
    let div = document.createElement('div')
    div.id='RefreshDiv'
    let img = document.createElement('img')
    img.src = 'images/refresh.png'
    img.style.width = '100%';
    img.style.height = '90%';
    div.title='刷新';
    div.onclick = function () {
        Update_Cloud();
    }
    div.onmousemove = function () {
        document.body.style.cursor = "pointer";
    }
    div.onmouseout = function () {
        document.body.style.cursor = "auto";
    };
    document.body.append(div)
    div.appendChild(img);
}
