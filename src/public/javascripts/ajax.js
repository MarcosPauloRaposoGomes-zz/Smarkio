$(function(){
  $('#makeResquest').on('click',function(){
    $.ajax({
      url: '/',
      sucess: function(products) {
        let ulist = $('ul')

        ulist.html('')
        comments.forEach(comment => {
          ulist.append(`
            <li>
              <p>${comment}</p>
              <button type="button" onclick="speak(${comment})" class="playButton">Ouvir</button>
            </li>
          `)
        });

      }
    })
  })
})