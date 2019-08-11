// var $content = $('#content')
// var $readMorebtn = $('<button>')

// $('#content').addClass('partial-hidden')
// $readMorebtn.text("อ่านต่อ").insertAfter($content)


// $readMorebtn.on('click', function () {
//   $(this).remove()
//   $content.removeClass('partial-hidden')
// })


var $loginform = $('#login-form')

$loginform.on('submit', function (e) {
  e.preventDefault()
  var $this = $(this)
  console.log($this.serialize())


  $.ajax({
    url: '/login',
    method: 'post',
    data: $this.serialize(),
    type: 'json',
    success: function (response){
      console.log(response)
    }
  })
})