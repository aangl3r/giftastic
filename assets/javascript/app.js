

$(document).ready(function () {

    //array of values for the initial buttons
    var cartoons = ["SpongeBob", "Powerpuff Girls", "Dexters Lab", "Rocket Power", "Johnny Bravo", "The Simposons", "The Jetsons", "Adventure Time"];

    //function to add buttons to the DOM
    function addBtns() {
        $(".buttons").empty();
        for (var i = 0; i < cartoons.length; i++) {
            $(".buttons").append(`<button type='button' class='btn btn-secondary' data-name='${cartoons[i]}'>${cartoons[i]}</button>`);
            displayGifs();
        }
    }

    addBtns();

    //takes the user input and creates a button based on that input
    $("#add-show").on("click", function () {
        event.preventDefault();
        var show = $("#user-input").val().trim();
        cartoons.push(show);
        addBtns();
        return;
    });

    //function to query giphy
    function displayGifs() {

    $("button").on("click", function () {
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=0g5BQi8ejhrUkuSZpYxPpBc6g2Ctb7fs&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            //store response.data in variable
            var showData = response.data;
            $("#gifs").empty();
            //loops through the array response.data and assigns attributes and html tags to the GIF pulled. appends the gif to the DOM.
            for (var i = 0; i < showData.length; i++) {
                var gifDiv = $("<div class='gifDiv'>");
                var rating = $("<p>").text(`Rating: ${showData[i].rating}`);
                var showGif = $("<img>");
                var sdArray = showData[i].images;

                showGif.attr("src", sdArray.original_still.url);
                showGif.attr("data-still", sdArray.original_still.url);
                showGif.attr("data-animate", sdArray.original.url);
                showGif.attr("data-state", "still");
                showGif.attr("class", "gif");
                gifDiv.append(rating);
                gifDiv.append(showGif);
                $("#gifs").append(gifDiv);
            }
        });
    });

}

    //function contains logic to start and stop the gifs when clicked
	function moveStop(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        var $this = $(this);

		if (state == "still") {
			$this.attr("src", animateImage);
			$this.attr("data-state", "animate");
		}

		else if (state == "animate") {
			$this.attr("src", stillImage);
			$this.attr("data-state", "still");
		}
	}

    $(document).on("click", ".gif", moveStop);
    

})



//var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=0g5BQi8ejhrUkuSZpYxPpBc6g2Ctb7fs";