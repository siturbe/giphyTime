
const giphyAPIkey = '4N9bCuDdA4AZFIQ710JoAC8rfVVNiAO3';

let topics = ['Formula 1', 'Pearl Jam', 'Guitars', 'Golf', 'Star Wars', 'Monty Python', 'Texas']

//function to display buttons
function renderButtons(){
    $('#button-section').empty();
    for(let i=0; i < topics.length; i++){
        $('#button-section').append("<button class='btn btn-primary topic-button' data-topic='" + topics[i] + "'>" + topics[i] + "</button>");
    }
}


//function to add buttons for new giphy
function addNewButton(event){
    event.preventDefault();
    let topic = $('#search-input').val().trim();
    topics.push(topic);
    $('#search-input').val('');
    renderButtons();
}

//Question to ask TA:  Why does a button work for a section with buttons, and not for a class of buttons on the ".on('click')" commands

// $('.topic-button').on("click", function(){
//     console.logt('test');
// })

function displayGifs(event){
    event.preventDefault();
    $('#giphy-section').empty();
    var gifTopic = $(this).attr('data-topic');
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=" + giphyAPIkey + "&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method:  "GET"
    })
        .then(function(response){
            let results = response.data;

            for(let i=0; i<results.length; i++){
                let gifDiv = $("<div>");

                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let topicImage = $('<img class="gif">');
                topicImage.attr('src', results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(topicImage);

                $('#giphy-section').prepend(gifDiv);
            }
        })
    
}



