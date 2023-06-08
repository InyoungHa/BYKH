 //인쇄하기
 function printArea(){
 var initBody = document.body.innerHTML;
    window.onbeforeprint = function(){
        document.body.innerHTML = document.getElementById("bottomBox").innerHTML;
    }
    window.onafterprint = function(){
        document.body.innerHTML = initBody;
    }
    window.print();
    location.reload();
}