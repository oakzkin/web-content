var $content = $('#content')
var $readMorebtn = $('<button>')

$('#content').addClass('partial-hidden')
$readMorebtn.text("อ่านต่อ").insertAfter($content)


$readMorebtn.on('click', function () {
  $(this).remove()
  $content.removeClass('partial-hidden')
})