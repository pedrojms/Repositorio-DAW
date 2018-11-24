function loadXml() {
  $.ajax({
      type: "GET",
      url: "tweetsDisney.xml",
      dataType: "xml",
      success: function(xml){
          $(xml).find('item').each(function(){
            var user = $(this).find('creator').text();
            var perfil = $(xml).find('url').text();
            var descripcion = $(this).find('description').text();
            var url = $(this).find('link').text();
            var fecha = $(this).find('pubDate').text();
            addTweet(user,perfil,descripcion,url,fecha);

          });
      },
      error: function() {
        alert("Error al procesar el xml");
      }
  });
}

function addTweet(autor, perfil, descripcion, url, fecha) {
   var aut = $("<h5/>", {
      "class":"card-title",
      html: autor
    })

   var profile = $('<img/>',{"class":"col-1","src":perfil});

    var p = $("<p/>",{
      "class": "col-12 card-text",
      html: descripcion
    })

    var date = $("<p/>",{
      "class": "fecha col-12 card-text",
      html: fecha
    })

    var link= $("<a/>",{"class": "col-12 card-text","href": url, html:url});

    var div1 = $( "<div/>", {
      "class": "tweet row"
    });

    var div2 = $( "<div/>", {
      "class": "col-11"
    });

    
    profile.appendTo(div1)
    aut.appendTo(div2)
    p.appendTo(div2)
    link.appendTo(div2)
    date.appendTo(div2)
    div2.appendTo(div1)
    div1.appendTo( "#tweets" );
}

$(document).ready(function(){
  
	loadXml();
  $("#tweets").hide();
  

  $("button").click(function(e){
    e.preventDefault();

    $("h3#texto").text($("input#buscador").val());
    var texto = $('input#buscador').val();
    
    if(texto.length != 0) {
      
      $('#tweets .tweet').filter(function(index){
        
        $(this).show();
        
        var tweet = $(this).text()
        if(tweet.indexOf(texto) == -1) {
          $(this).hide()
        }

      });
      $("#tweets").show();

    } else {
      $('#tweets').hide();
      
    }
    

    
  })


});