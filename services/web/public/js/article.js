function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


var $loginform = $('#login-form')
var $logoutBtn = $('.logout-btn')
var $alertLoginError = $('.alert-login-err')

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
      if(response.status) {
        $alertLoginError.addClass('d-none')
        var token = response.token
        setCookie('jwt', token, 30)
        location.reload()
      }else {
        $alertLoginError.text(response.message).removeClass('d-none')
      }
    }
  })
})


$logoutBtn.on('click', function (e){
  e.preventDefault()
  setCookie('jwt', '', -1)
  location.reload()
})