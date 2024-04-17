var Anchor = document.getElementById("filterAnchor");
var filterBtnSpan = document.getElementById("filterBtn");

Anchor.addEventListener("click", function() {
    event.preventDefault();
});

function toggleFilter(event){
    var text = event.textContent || event.innerText;
    var filterCont = document.getElementById('filter');
    if(text == 'اخفاء الفلتر'){
        event.innerHTML = 'اظهار الفلتر';
        filterCont.classList.add('hidden');
        filterCont.classList.remove('visible');
    }
    else{
        event.innerHTML = 'اخفاء الفلتر';
        filterCont.classList.add('visible');
        filterCont.classList.remove('hidden');
    }
}