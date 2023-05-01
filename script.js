function functionforlogs() {
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
function functionforrecord() {
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
                a.innerHTML =json[listnumber]["time"];
                document.body.append(article);
                article.insertAdjacentElement("afterbegin", p);
                article.insertAdjacentElement("afterbegin", a);
            };
        }
    }
}
