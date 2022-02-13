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
  console.log('s')
}, 200)

$(function() {

  var nowYear  = new Date().getFullYear();
  var diffYear = nowYear - 2018;

  $('#status').html(`
    <small>
      <p>DISCLAIMER: This site has not been updated and contains contents ${diffYear} year${diffYear == 1? '': 's'} ago. The comments may not reflect the instructors' and the professors' way of teaching today.</p> 
    </small>
  `)
})

function StarCalculate(number){
  var starct = parseInt(number);
  var string = "";
  for (var i = 0; i < starct; i++) {
    string = string + "<i class='fas fa-star'></i>";
  }

  return string;
}

function Divider(number){
  var result = "";
  if((number%5) == 4){
    result = "<div class='divider d-block'></div>";
  }
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
    if (!searchName) return;
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
    $('#profs').html('')
    //searchResults.length
    for (var i = 0; i < searchResults.length; i++) {
      $('#profs').append(profTemplate.format(
        searchResults[i].lastName,
        searchResults[i].firstName,
        Over(searchResults[i].rating.helpfulness.toFixed(2)),
        Over(searchResults[i].rating.pedagogy.toFixed(2)),
        Over(searchResults[i].rating.easiness.toFixed(2)),
        Over(searchResults[i].rating.overall.toFixed(2)),
        searchResults[i]._id,
        Divider(i),
      ))
    }
    $('button').click('click', function() {
      if ($(this).attr('shown') == 'true') {
        reviewList = $(this).parent().children('ul')
        reviewList.html('')
        $(this).attr('shown', 'false')
        $(this).text('Show Reviews')
        $("#profs li").addClass("d-block")
        $("#profs li").removeClass("d-none")
         $(".divider").addClass("d-block")
        $(".divider").removeClass("d-none")
      } else {
        $("#profs li").removeClass("d-block")
        $("#profs li").addClass("d-none")
        $(".divider").removeClass("d-block")
        $(".divider").addClass("d-none")
        $(this).parent().removeClass("d-none")
        $(this).parent().addClass("d-block")
        reviewList = $(this).parent().children('ul')
        reviewList.html('')
        id = $(this).attr('id')
        profReviews = reviews.filter(function(p) {
          return id == p.professor_id
        })
        profReviews.sort(function(a, b) {
          return parseInt(b.year)-parseInt(a.year)
        })
        for (var i = 0; i < profReviews.length; i++) {
          reviewList.append(reviewTemplate.format(
            profReviews[i].comment,
            profReviews[i].classTaken,
            StarCalculate(profReviews[i].rating.helpfulness),
            StarCalculate(profReviews[i].rating.pedagogy),
            StarCalculate(profReviews[i].rating.easiness),
            profReviews[i].year,
          ))
        }
        $(this).attr('shown', 'true')
        $(this).text('Hide Reviews')
      }
    })
  })
}

profTemplate = '\
<li class="d-block">\
  <div>{0}, {1}</div>\
  <div>Helpfulness: {2}</div>\
  <div>Pedagogy: {3}</div>\
  <div>Easiness: {4}</div>\
  <div>Overall: {5}</div>\
  <button id="{6}" class="review-button btn">Show Reviews</button>\
  <ul></ul>\
</li>\
{7}\
'
reviewTemplate = '\
<li>\
  <div>{0}</div>\
  <div>Class Taken: {1}</div>\
  <div>Helpfulness: {2}</div>\
  <div>Pedagogy: {3}</div>\
  <div>Easiness: {4}</div>\
  <div>Year: {5}</div>\
</li>\
'
