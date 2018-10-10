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