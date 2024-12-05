String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};


intervalId = setInterval(function() {
  if (typeof professors !== 'undefined') {
    mainFunc()
    clearInterval(intervalId)
  }
}, 200)

$(function() {

  const nowYear  = new Date().getFullYear();
  const diffYear = nowYear - 2018;

  $('#disclaimer').html(`
    <small>
      <p class="fst-italic mb-0">
        <span>DISCLAIMER: Not affiliated with the original Profs to Pick developer "Secretmapper/Himachizu."</span>
      </p> 
      <p class="mb-2">
        Only for archival purposes. This site has not been updated and contains contents ${diffYear} year${diffYear == 1? '': 's'} ago. #RIPRUPP
      </p>
      <p class="beware">
        The comments may not reflect the instructors' and the professors' way of teaching today.
      </p>
    </small>
  `)

  $('#status').remove();
})

let messageCt = 0;
setInterval(function() {
  let messages = [
    "The comments may not reflect the instructors' and the professors' way of teaching today.",
    "Please don't muddle your judgement.",
    "Remember that each student is challenged differently.",
    "Some may rate high because they easily received a high grade but some rate high after being challenged and learned."
  ];

  messageCt = (messageCt + 1) % messages.length;
  $(".beware").html(messages[messageCt]);

}, 12000)

function StarCalculate(number){
  var starct = parseInt(number);
  var string = "";
  let i = 0;
  while (i < 5){
    let star = `<i class="fa-regular fa-star"></i>`;
    if (i < starct){
      star = `<i class='fa-solid fa-star'></i>`;
    }
    string = string.concat(star); 
    i = i+1
  }

  return string;
}

function Divider(){
  result = "<div class='divider d-block'></div>";
  return result;
}

function Over(number){
  var rating = parseInt(number);
  var result = number;
  if(rating > 5){
    result = "<span class='over9000'>" + number + "</span>";
  }

  return result;
}

function mainFunc() {
  $('#search-bar').on('change keyup pase', function() {
    searchName = this.value
    
    if(searchName == ''){
      $('#profs').html('');
      $("#bottom-text").removeClass("d-none");
    }
    else if(searchName.length > 1){
      searchName = searchName.toLowerCase()
      searchResults = professors.filter(function(p) {
        firstName = p.firstName.toLowerCase()
        lastName = p.lastName.toLowerCase()
        return firstName.includes(searchName)
          || lastName.includes(searchName) ||
          (lastName + ' ' + firstName).includes(searchName) ||
          (lastName + ', ' + firstName).includes(searchName) ||
          (firstName + ' ' + lastName).includes(searchName)
      })

      let searchStart = new RegExp(String.raw`^${searchName}`, "ig");
      searchResults.sort(function(a, b) {
        return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
      });
      searchResults.sort(function(a, b) {
          return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
      });
      searchResults.sort(function(a, b) {
        return +(searchStart.test(b.firstName.toLowerCase())) - +(searchStart.test(a.firstName.toLowerCase()));
      });
      searchResults.sort(function(a, b) {
        return +(searchStart.test(b.lastName.toLowerCase())) - +(searchStart.test(a.lastName.toLowerCase()));
      });

      $('#profs').html('');
      //searchResults.length
      if(searchResults.length == 0){
        $('#profs').append(noResultTemplate);
        $("#bottom-text").removeClass("d-none");
      }
      else{
        for (var i = 0; i < searchResults.length; i++) {
          if(i > 0){
            $('#profs').append(Divider());
          }

          $('#profs').append(profTemplate.format(
            searchResults[i].lastName,
            searchResults[i].firstName,
            Over(searchResults[i].rating.helpfulness.toFixed(2)),
            Over(searchResults[i].rating.pedagogy.toFixed(2)),
            Over(searchResults[i].rating.easiness.toFixed(2)),
            Over(searchResults[i].rating.overall.toFixed(2)),
            searchResults[i]._id
          ));
        }
        $("#bottom-text").addClass("d-none");
      }
    }
    
    $('.review-button').on('click', function() {
      if ($(this).attr('shown') == 'true') {
        reviewList = $(this).closest(".prof-row").children('ul')
        reviewList.html('')
        $(this).attr('shown', 'false')
        $(this).text('Show')
        $("#profs li").addClass("d-flex")
        $("#profs li").removeClass("reviews-shown")
        $("#profs li").removeClass("flex-column")
        $("#profs li").removeClass("d-none")
         $(".divider").addClass("d-block")
        $(".divider").removeClass("d-none")
      } else {
        $("#profs li").removeClass("d-flex")
        $("#profs li").addClass("d-none")
        $(".divider").removeClass("d-block")
        $(".divider").addClass("d-none")
        $(this).closest(".prof-row").removeClass("d-none")
        $(this).closest(".prof-row").addClass("d-flex flex-column reviews-shown")
        reviewList = $(this).closest(".prof-row").children('ul')
        reviewList.html('')
        id = $(this).attr('id')
        profReviews = reviews.filter(function(p) {
          return id == p.professor_id
        })
        profReviews.sort(function(a, b) {
          return parseInt(b.year)-parseInt(a.year)
        })

        reviewList.append(`${profReviews.length} review${profReviews.length == 1? '': 's'}`);

        for (let i = 0; i < profReviews.length; i++) {
          let average = parseInt(profReviews[i].rating.helpfulness) + 
          parseInt(profReviews[i].rating.pedagogy) + parseInt(profReviews[i].rating.easiness);
          average = average/3;

          reviewList.append(reviewTemplate.format(
            profReviews[i].comment,
            profReviews[i].year,
            profReviews[i].classTaken,
            average.toFixed(2),
            StarCalculate(profReviews[i].rating.helpfulness),
            StarCalculate(profReviews[i].rating.pedagogy),
            StarCalculate(profReviews[i].rating.easiness),
          ))
        }

        $(this).attr('shown', 'true')
        $(this).text('Back')
      }
    })
  })
}

noResultTemplate = `
  <p class="my-3 mx-auto">No results found</p>
` 