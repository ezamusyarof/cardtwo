var idArray = [];
var fStep = 0;
var cStep = 0;
var fId = 0;
var cId = 0;
var nImg = 0;
var cnImg = 0;
var errorImg = [86,97,105,138,148,150,205,207,224,226,245,246,262,285,286,298,303,332,333,346,359,393,413,421,438,462,463,469,489,540,561,578,587,589,592,595,597,601,624,632,636,644,647,673,697,706,707,708,709,710,711,712,713,714,720,725,734,741,742,743,744,745,746,747,748,749,750,751,752,753,754,759,761,762,763,771,792,801,812,843,849,854,895,897,899,916,920,934,956,963,968];

function start(x) {
    nImg = x;
    // create x img's
    for (let i=1; i<=x; i++) {
        let img = document.createElement("img");
        img.src = "card.png";
        img.id = "i"+(i);
        img.alt = "card/img";
        img.setAttribute("onclick", "buka("+(i)+")");
        img.setAttribute("onerror", "error(this)");
        document.getElementById("card").appendChild(img);        
    }        
    // random array
    var randomArray = [];
    while (randomArray.length < x/2) {
        var randomNum = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        while (errorImg.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        }
        if (!randomArray.includes(randomNum)) {
            randomArray.push(randomNum)
        }
    }
    // shuffle array
    var randomArray = randomArray.concat(randomArray);
    randomArray.sort(function(a, b) {
        return Math.random() - 0.5;
    });
    idArray = randomArray;
}

function restart(x) {
    document.getElementById("card").innerHTML = "";
    idArray = [];
    fStep = 0;
    cStep = 0;
    fId = 0;
    cId = 0;
    cnImg = 0;
    start(x);
}

function buka(x) {
    // open card
    document.getElementById('i'+x).src = "https://picsum.photos/id/"+idArray[x-1]+"/200/300";
    document.getElementById('i'+x).classList.add("light");
    document.getElementById('i'+x).setAttribute("onclick", "");
    document.getElementById('i'+x).style.filter = "grayscale(95%)";;
    setTimeout(function() {
    if (fStep == 0) {
        fStep = idArray[x-1];
        fId = x;
    } else {
        cStep = idArray[x-1];
        cId = x;
        if (cStep == fStep) {
            cStep, fStep = 0;
            cnImg++;
            cnImg++;
            if (cnImg==nImg) {
                restart(nImg);
            }
        } else {
            // close card
            cStep, fStep = 0;
            document.getElementById('i'+(fId)).src = "card.png";
            document.getElementById('i'+(fId)).classList.remove("light");
            document.getElementById('i'+(fId)).setAttribute("onclick", "buka("+(fId)+")");
            document.getElementById('i'+(cId)).src = "card.png";
            document.getElementById('i'+(cId)).classList.remove("light");
            document.getElementById('i'+(cId)).setAttribute("onclick", "buka("+(cId)+")");
        }
    }
    }, 1200);
    
}

function error(img) {
    img.src = "img-1.jpg";
    img.onerror = null;
}

