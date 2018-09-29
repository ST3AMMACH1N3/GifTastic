$(document).ready(() => {
    const key = "KAQikHPY4JWQtqS30Xp06f9jo1z9j99n";
    const url = "https://api.giphy.com/v1/gifs/search?";
    const limit = 10;
    let topics = ["spacex", "programming", "robotics", "woodworking", "stunts"];

    function addButton(event) {
        event.preventDefault();
        let value = $("#text-box").val();
        if (value !== "") {
            topics.push(value);
            $("#text-box").val("");
            createButtons();
        }
    }

    function changeState() {
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    function createButtons() {
        $("#button-div").empty();
        for(let i = 0; i < topics.length; i++) {
            let button = $("<button>").addClass("button");
            button.text(topics[i]);
            button.attr("data-name", topics[i]);
            $("#button-div").append(button);
        }
    }

    function createGifs() {
        $("#gif-div").empty();
        let search = $(this).attr("data-name");
        $.ajax({
            url: `${url}api_key=${key}&limit=${limit}&q=${search}`,
            method: "GET"
        }).then((response) => {
            let data = response.data;
            for(let i = 0; i < data.length; i++) {
                let div = $("<div>").addClass("img");
                let title = data[i].title.trim().replace(/gif/i, "");
                let titleP;
                if (title !== "") {
                    titleP = $("<p>").text(`Title: ${title}`)
                }
                let ratingP = $("<p>").text(`Rating: ${data[i].rating}`);
                let image = $("<img>");
                image.attr("data-state", "still");
                image.attr("data-still", data[i].images.fixed_height_still.url);
                image.attr("data-animated", data[i].images.fixed_height.url);
                image.attr("src", data[i].images.fixed_height_still.url);
                image.attr("alt", data[i].title);
                div.append(image, titleP, ratingP);
                $("#gif-div").append(div);
            }
        });
    }

    $(document).on("click", "button", createGifs);

    $(document).on("click", "img", changeState);

    $(document).on("click", "#submit", addButton);

    createButtons();
});