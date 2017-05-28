$(document).ready(function() {
	
    var api_key = "api_key=d6567c81b3f90902e0886a226056f0d6";
    var base_url ="https://api.themoviedb.org/3";
    var page;
    var total;
	var pager = false;


    $(".container").on("mouseenter",".posters img",function(){
        $(this).fadeTo(50,0.7);
    });

    $(".container").on("mouseleave",".posters img",function(){
        $(this).fadeTo(50,1);
    });


   
    var url = base_url+"/person/popular?"+api_key;
    
$.getJSON(url, glumci);

function glumci(data){
    $.getJSON(url, function(data, status){
        page = data.page;
        total = data.total_pages;

         if(!pager){ 
            paging();
        }


        var $div = $('div.posters');
        $div.empty();
        var $row;
        $.each(data.results, function(index, value){
        console.log(data);
            if(index % 4 == 0){
                $div.append("<br/>");
                $row = $("<div class='row'></div>");
                $div.append($row);
            }

            var $ime = value.name;
            var $id = value.id;
            var $slika = value.profile_path;

            var $divCol = $('<div class="col-md-3"></div>');
             
            var $img = $('<img src="http://image.tmdb.org/t/p/w300/'+$slika+'" title="'+$ime+'" id="'+$id+'" class="img-thumbnail">');
            $divCol.append($img);
            $row.append($divCol);
        

        });

    });// kraj za ubacivanje slika inicijalno
}
    

$('.container').on('click', 'img', function(e){
    var urlFilm = base_url+"/person/"+$(this).attr('id')+"/movie_credits?"+api_key;

    $.getJSON(urlFilm, function(data, status){
        var $select = $('#cbInput');
        $select.empty();
        var $option;
        var $op = $('<option value="">Filmovi</option>');
        $select.append($op);
        $.each(data.cast, function(index, value){
            var filmovi = value.title;
            var filmID = value.id;
            
            $option = $('<option value="'+filmID+'">'+filmovi+'</option>');

            $select.append($option);
        });


    });

});// kraj za select/option 


$('.container').on('click', 'img', function(e){
    var urlDetail = base_url+"/person/"+$(this).attr('id')+"?"+api_key;

$(".movie").fadeOut(100);

    $.getJSON(urlDetail, function(data, status){

            var $mDiv = $(".movie");
            var $img = $mDiv.find("img");
            $img.attr("src", "http://image.tmdb.org/t/p/w185" + data.profile_path);

            var $zaglavlje = $mDiv.find(".title");
            $zaglavlje.attr('href', 'http://www.imdb.com/name/'+data.imdb_id).text(data.name);
            $mDiv.find("#biography").text(data.biography);
            $mDiv.find('#birthday').text('Born: '+data.birthday);
            $mDiv.find('#placeofbirth').text('Place of birth: '+data.place_of_birth);
           

            if($mDiv.css("display") == "none")
                $mDiv.slideDown("slow");
            else{
                $mDiv.fadeIn();
            }

      });


    });//kraj za biografiju

   var $imdb; 
   var get_url;
$(document).on('click', 'option', function(e){
     get_url = base_url+"/movie/"+$(this).attr('value')+"?"+api_key;
    $.getJSON(get_url, function(data, status){
    
         if(data.imdb_id != undefined){
            $('button').attr("disabled", false);
         }
         $imdb = data.imdb_id;
       
    });


}); //button enabled


$("#btnImdb").click(function(){
        $.getJSON(get_url, openInNewTab("http://www.imdb.com/title/"+$imdb+"/"));
    }); // kraj za button


function paging(){
    pager = true;
    var $ul = $('ul.pager');
    $ul.empty();

    for(var i = page; i < page+1; i++){
        var $li = $('<li><a href="#" id="'+i+'">Next</a></li>');
        
         if(i == page){
            $li.addClass("active");
            }
         $ul.append($li);

          if(i == total)
                break;

            
    }




}

$("ul.pager").on("click", "li", function(){
        var $ulPag = $("ul.pager");
        var request_page = parseInt($(this).attr("id"));       
        if($(this).text() == "Next"){
          

                for(i = total; i > total - 1; i--){
                    var li = $("<li></li>");
                    var a = $("<a href='#' id='"+i+"''>Prev</a>");
                    li.append(a);

                    if(i == request_page){
                        li.addClass("active");
                    }
                    $ulPag.prepend(li);
                    
                    if(i == 1){ //Ovo nikada ne bi trebalo da se desi
                        flag = true;
                        break;
                    }
                }
                if(!flag){ 
                    var li = $("<li></li>");
                    var a = $("<a href='#' id='"+i+"'></a>");
                    a.text("Prev");
                    li.append(a);
                    $ulPag.prepend(li);
                }
            }
        
         var r_url =  url+ "&" + "page=" + request_page; 
                $.getJSON(r_url, glumci);
        

      
    });


});//kraj doc.ready



function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}





















