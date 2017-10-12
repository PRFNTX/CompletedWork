var scores=[5,5];

var voteMos = $(".vote-mos");
var voteAuth = $(".vote-auth");
var barMos =$(".bar-mos") ;
var barAuth=$(".bar-auth");

voteMos.click(function(){
    scores[0]+=1;
    balance();
});

voteMos.click(function(){
    scores[1]+=1;
    balance();
});

function balance(){
    var total=scores[1]+scores[0];
    var unit=Math.round(total/12);
    var bars=[Math.round(scores[0]/unit),Math.round(scores[1]/unit)];
    barMos.addClass("col-sm-"+bars[0]);
    barAuth.addClass("col-sm-"+bars[1]);
}