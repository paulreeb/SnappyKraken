document.getElementById("submit").addEventListener("click", afterClick, emptyTable);

function emptyTable() {
    document.getElementById("repo").empty();
}

function afterClick() {

    var username = document.getElementById("textInput").value;

    fetch('https://api.github.com/users/' + username, {
            method: "GET"
        })
        .then(function (response) {

            if (response.ok) {
                return response.json();

            }

            throw new Error(response.statusText);
        })
        .then(function (json) {
            console.log(json);
            var data1 = json
            displayProfile(data1);
            document.getElementById("empty").style.display = "none";
            document.getElementsByClassName("profileBox")[0].style.display = "flex"
            document.getElementsByClassName("hide")[0].style.display = "flex"
        })
        .then(fetch('https://api.github.com/search/repositories?q=user:' + username)
            .then(function (response) {

                return response.json();
            })
            .then(function (json) {
                console.log(json);
                var data2 = json;
                displayRepo(data2);
                noRepo(data2);
                changeDisplay();
            }))
        .catch(function (error) {
            console.log("Did not work");
            document.getElementById("tableBottom").style.display = "none";
            document.getElementById("empty").style.display = "flex";
            document.getElementsByClassName("profileBox")[0].style.display = "none";
            document.getElementsByClassName("hide")[0].style.display = "none";
        });
}

function displayProfile(data1) {
    document.getElementById("picture").setAttribute("src", data1.avatar_url);
    document.getElementById("userName").innerHTML = "@" + data1.login;
    document.getElementById("fullName").innerHTML = data1.name;
    document.getElementById("bio").innerHTML = data1.bio;
}

function displayRepo(data2) {
    if (data2.total_count > 0) {
        document.getElementById("tableBottom").style.display = "";
        document.getElementById("repo").innerHTML = "";
        for (var i = 0; i < data2.items.length; i++) {
            document.getElementById("repo").innerHTML += "<tr id='tableData'><td>" + data2.items[i].name + "</td><td><i class='fas fa-star'></i>" + data2.items[i].stargazers_count + "</td><td><i class='fas fa-code-branch'></i>" + data2.items[i].watchers_count + "</td></tr>"
        }
    }
}

function noRepo(data2) {
    if (data2.message == "Validation Failed") {
        document.getElementById("tableBottom").style.display = "none";
    }
}

function changeDisplay() {
    document.getElementsByClassName("hide")[0].style.display = "flex";
}
