

    // to navigate the dumb amount of stuff i did:   -->
    //   search for " HERE " on each page to jump to required features-->
//////////////////////
//TAB variables
//////////////////////
var btn_tab = $(".comments");
var tabs = $(".right");
var tabShown=0;
var name;
var spn_count = $("#count");

//////////////////////
//Comment form variables
//////////////////////
var frm_newComment = $(".new-comment .submit")
var btn_newComment_clear = $(".new-comment .clear")
var txa_newComment = $(".new-comment textarea")
var cmt_num = 1;

//////////////////////
//tab button
//////////////////////
var btn_gridView = $(".grid-view");
var boo_grid=false;


//////////////////////
//add bio variables
//////////////////////
var btn_bioAdd = $(".add-p")
var btn_bioSub = $(".sub-p")
var btn_itemAdd = $(".add-i")
var btn_itemSub = $(".sub-i")
var txa_bio=$(".bio")
var txt_item=$(".listitem")

var btn_bio=$("#bio-submit")

var div_bio=$(".div-bio")
var div_list=$(".div-list")
var num_p=1;
var num_i=1;

/////////////////
/////////////////




function start(){
    tabs = $(".right");
    for(var i=0;i<tabs.length;i++){
        $(tabs[i]).hide();
    }
    reset();
}

function reset(){

    $(tabs[tabShown]).show("slide",{direction:"right"},1);
    name=$(tabs[(tabShown+1)%tabs.length]).attr("name");
    $("#next-name").text(name);
}

/////// HERE (animation on mouseover)/////////
///Image Hover
///////////////////////////////////////////
var img_gav = $("#gav");
var boo_intensifies=false;
img_gav.on("mouseenter",function(){
    boo_intensifies=true;
});

img_gav.mouseout(function(){boo_intensifies=false})
setInterval(function(){
    if(boo_intensifies){
        var dx=Math.floor(Math.random()*20);
        var dy=Math.floor(Math.sqrt(20^2 - dx^2))-10;
        img_gav.animate({top:dy+"px", left:dx+"px"},20);
    }
},40)

//////////////////////
//TAB control
//////////////////////
btn_tab.click(function(){
        $(this).hide();
        $(tabs[tabShown]).hide("slide",{direction:"left"},500,function(){

            tabShown= (tabShown+1)%tabs.length;
            $(tabs[tabShown]).show("slide",{direction:"right"},500,function(){
                name=$(tabs[(tabShown+1)%tabs.length]).attr("name");
                $("#next-name").text(name);
                btn_tab.show();

            });
        });

        console.log("show: "+tabShown);

});

//////// HERE (element scaling with bootstrap) //////////////////
///Grid Mode
///////////////////////////////////////////////////////////////
function grid(){

    var bios = $(".bio");
    var container=$(".grid");
     if(boo_grid){
         //ungrid
        bios.addClass("right");
        bios.removeClass("col-sm-6");
        bios.removeClass("col-md-4");
        $(".main").removeClass("right");
        $(".main").addClass("left");
        
        container.removeClass("row container");
        bios.off("click");
        boo_grid=false;
        checkSize();
        btn_tab.show();

     } else {
        //grid
        container.addClass("row container");
        $(".left").addClass("right").removeClass("left")
        $(".right").hide();
        bios.removeClass("right").addClass("col-sm-6 col-md-4 grid-item")
        bios.show();
        boo_grid=true;
        btn_tab.hide();

     }
}

btn_gridView.click(function(){
    grid();
});

///////// HERE (2 commented blocks)/////////
//COMMENT events and functions
//////////////////////
txa_newComment.keyup(function(){
    console.log("text area change")
    if($(this).val().length>=255){
        $(this).text($(this).val().substring(0,253));
    } else {
        spn_count.text(txa_newComment.val().length);
    }
});


txa_newComment.keydown(function(event){
    if(event.which===13){
        if((txa_newComment.val().length>0)&(txa_newComment.val().length<255)){
            addComment(txa_newComment.val());
        }
        else if(txa_newComment.val().length===0){
            alert("Type a comment, then press submit")
        }
        else if(txa_newComment.val().length>=255){
            alert("Comment is too long. Please limit to 255 characters.")
        }
        else {
            alert("Im really not sure what went wrong...")
        }
    }
    console.log(event.which)
});

//////////////////////
// on comment form submit
//////////////////////
frm_newComment.submit(function(event){
    event.preventDefault();
    if((txa_newComment.val().length>0)&(txa_newComment.val().length<255)){
        addComment(txa_newComment.val());
    }
    else if(txa_newComment.val().length===0){
        alert("Type a comment, then press submit")
    }
    else if(txa_newComment.val().length>=255){
        alert("Comment is too long. Please limit to 255 characters.")
    }
    else {
        alert("Im really not sure what went wrong...")
    }
});

btn_newComment_clear.click(function(){

    txa_newComment.val(null);
    spn_count.text(txa_newComment.val().length);
});

var div_commentsList = $("#comments-list");
function addComment(data){
    div_commentsList.append("<div class=\"comment-item\"><p>"+cmt_num+": "+data+"</p></div><hr>");
    cmt_num+=1;
    txa_newComment.val("");
    spn_count.text(txa_newComment.val().length);
    div_commentsList[0].scrollTop = div_commentsList[0].scrollHeight;
    
}

//////////////////////
//RESIZE functions and handing
//////////////////////
$(window).resize(function(event){

    console.log(boo_grid)
    if(!boo_grid){
        console.log("in")
    if($(window).width() <=500){
        var change = $(".left");
        console.log(change)
        change.removeClass("left");
        change.addClass("right");
        tabShown = 0;
        start();

    } else {
        var change = $(".main");
        if(change.length>0){
            change.removeClass("right");
            change.addClass("left");
            tabShown = 0;
            start();
        }
    }
}
});

function checkSize(){
    console.log(boo_grid)
    if(!boo_grid){
        console.log("in")
    if($(window).width() <=500){
        var change = $(".left");
        change.removeClass("left");
        change.addClass("right");
        tabShown = 0;
        start();

    } else {
        var change = $(".main");
        if(change.length>0){
            change.removeClass("right");
            change.addClass("left");
            tabShown = 1;
        } 
        start();
    }
}
};

//////////////////////
//BIO form controls
//////////////////////

btn_bioAdd.click(function(){
    if(num_p<5){
    div_bio.append("<textarea rows=\"4\" cols=\"40\" class=\"text tab bio form-control\" id=\"bio"+num_p+"\"></textarea>")
    num_p+=1;
    } else {
        alert("please be reasonable")
    }
});
btn_bioSub.click(function(){
    if(num_p>0){
        var remove = "#bio"+(num_p-1);
    $(remove).remove();
        num_p-=1;
    
    } else {
        alert("you must have a non-negative number of bio paragraphs")
    }
});
btn_itemAdd.click(function(){
    if(num_i<10){
    div_list.append("<input type=\"text\" class=\"item form-control\" id=\"bio-item"+num_i+"\">")
    num_i+=1;
    } else {
        alert("please be reasonable")
    }
});
btn_itemSub.click(function(){
    if(num_i>0){
        var remove = "#bio-item"+(num_i-1);
        $(remove).remove();
        num_i-=1;
    
    } else {
        alert("you must have a non-negative number of list items")
    }
});


//////////////////////
//BIO add variables:
//////////////////////
var name;
var bio=[];
var img;
var listTitle;
var listItems=[];

//////////////////////
//BIO create
//////////////////////
btn_bio.click(function(event){
    event.preventDefault();
    name=$("#bio-name").val();
    if(name==="Kurt Gödel"){
        alert("plz, no...")
        } else {
        for (var p=0;p<num_p;p++){
            bio.push($("#bio"+p).val());
        }
        img=$("#bio-image").val();
        listTitle=$("#bio-list-name").val();
        for (var i=0;i<num_i;i++){
            listItems.push($("#bio-item"+i).val());
        }
        spawnBio();
    }

})
function spawnBio(){
    
     var bio_parts=["<div class=\"right bio\" name=\""+name+"\"><h3 class=\"theme-text\">"+name+"</h3><div class=\"box-text\"><h4><strong>Bio:</strong></h4>","</div><div id=\"photo-albums\"><img src="+img+"><div><h3>"+listTitle+"</h3><ul>","</ul></div></div></div>"]
   
    for(var i=listItems.length-1;i>=0;i--){
        bio_parts.splice(2,0,"<li><span>"+listItems[i]+"</span></li>");
    }
    for(var p=bio.length-1;p>=0;p--){
        bio_parts.splice(1,0,"<p>"+bio[p]+"</p>");
    }
    var bio_add="";
    for(var f =0;f<bio_parts.length;f++){
        bio_add=bio_add+bio_parts[f];
    }
    console.log(bio_add);
    $(".left").after(bio_add);
    if (boo_grid){
        var reclass = $(".bio")
        reclass.addClass("col-6-sm");
        reclass.addClass("col-6-md");
        reclass.removeClass("right");
    }
    tabShown= tabs.length;
    start();
}

//////////////////
///CALLED AT START
/////////////////
checkSize();
