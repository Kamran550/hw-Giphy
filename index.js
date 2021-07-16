var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
];

var buttons = $("#animals")
var create = $("#add-animal")

function createButton() {
    buttons.empty()
    for (let i = 0; i < animals.length; i++) {
        var btn = $("<button>")
        btn.text(animals[i])
        btn.addClass('clickAnimal')
        buttons.append(btn)
    }

}

create.on('click', function (e) {
    e.preventDefault()
    var inp = $("#animal-input")
    animals.push(inp.val().trim())
    inp.val("")
    createButton()


})

$(document).on('click', '.clickAnimal', function () {
    var type = $(this).text()
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        var result = response.data

        for(var i in result){
            var animalImage  = $("<img>")
            var animated = result[i].images.fixed_height.url
            var still = result[i].images.fixed_height_still.url
            
            animalImage.attr('src',still)
            $("#giphys").append(animalImage)

            animalImage.attr('data-still',still)
            animalImage.attr('data-animated',animated)
            animalImage.attr('data-state','still')
            animalImage.addClass('still-animated')
        }
    })

})


$(document).on('click','.still-animated',function(){
    var state = $(this).data('state')

    if(state === 'still'){
       $(this).attr('src',$(this).attr('data-animated'))
       $(this).attr("data-state", "animate");
    
    }else {
        console.log(state)
        $(this).attr('src',$(this).attr('data-still'))
        $(this).attr('data-state','still')
    }
})



createButton()

