function rendering_forlogs() {
    window.onload = function () {
        var url = "datas.json"
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            var json = JSON.parse(request.responseText).logs;
            for (var listnumber in json) {
                let article = document.createElement("article");
                let p = document.createElement("p");
                let div = document.createElement("div");
                p.innerHTML = json[listnumber]["log"];
                div.innerHTML = "--" + json[listnumber]["time"];
                document.body.append(article);
                article.insertAdjacentElement("afterbegin", p);
                article.insertAdjacentElement("beforeend", div);
            };
        }
    }
}


function rendering_forrecord() {
    window.onload = function () {
        var url = "datas.json"
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            var json = JSON.parse(request.responseText).record;
            for (var listnumber in json) {
                let article = document.createElement("article");
                let p = document.createElement("p");
                let a = document.createElement("a");
                p.innerHTML = json[listnumber]["thing"];
                a.innerHTML = json[listnumber]["time"];
                document.body.append(article);
                article.insertAdjacentElement("afterbegin", p);
                article.insertAdjacentElement("afterbegin", a);
                console.log(listnumber)
                if (json[listnumber]["see_more"] != null) {
                    let now_number = listnumber;
                    let link_a = document.createElement("a");
                    link_a.innerHTML = "----->";
                    article.title="查看详情";
                    article.onmousemove = function () {
                        document.body.style.cursor = "pointer";
                        article.style = "margin-left: 19.2%;margin-right: 20.8%;"
                    };
                    article.onmouseout = function () {
                        document.body.style.cursor = "auto";
                        article.style = "margin-left: 20%;margin-right: 20%;"
                    };
                    article.insertAdjacentElement("beforeend", link_a);
                    article.onclick = function () {
                        window.open('record.html');
                        localStorage.setItem("record_name", json[now_number]["see_more"]);
                    };
                };
            };
        }
    }
}


function rendering_forrecord_pages() {
    var record_name = null;
    if (sessionStorage.getItem("record_name") != null) {
        record_name = sessionStorage.getItem('record_name');
    }
    else {
        record_name =localStorage.getItem('record_name');
        sessionStorage.setItem('record_name', record_name);
        localStorage.clear();
    };
    window.onload = function () {
        var url = "records.json"
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
                img.onclick=function(){
                    window.open(json["img"][img_number]["img_url"]);
                };
                img.onmousemove = function () {
                    document.body.style.cursor = "pointer";
                };
                img.onmouseout = function () {
                    document.body.style.cursor = "auto";
                };
                let pos_p = document.getElementById("p" + json["img"][img_number]["postion"]);
                document.body.insertBefore(img, pos_p.nextSibling);
            }
        }
    }
}
