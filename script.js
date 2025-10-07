function losujKarty(tablica) {
    let iloscKart = tablica.length;

    while (iloscKart != 0) {
        let randomWartosci = Math.floor(Math.random() * iloscKart);
        iloscKart--;

        [tablica[iloscKart], tablica[randomWartosci]] = [
            tablica[randomWartosci], tablica[iloscKart]];
    }
}

let karty = ['dom', 'kwiat', 'drzewo', 'ludzik', 'pies', 'usmiech', 'gwiazda', 'ptaki', 'monitor', 'deszcz', 'sklep', 'sluchawki', 'dom', 'kwiat', 'drzewo', 'ludzik', 'pies', 'usmiech', 'gwiazda', 'ptaki', 'monitor', 'deszcz', 'sklep', 'sluchawki'];
losujKarty(karty)

let karta = "";
for (i = 0; i <= karty.length-1; i++) {
    karta = karta + '<div class="karta" id="karta' + i + '" onclick="odslonKarte(' + i + ')"></div>';
}

document.getElementById("plansza").innerHTML = karta;

let pierwszaWidoczna = false;
let runda = 0;
let poprzedniaKarta;
let blokada = false;
const wszystkiePary = (karty.length)/2;
let pozostalePary = wszystkiePary;

function odslonKarte(nr) {
    const opacity = $('#karta' + nr).css('opacity');
    if (opacity == 0 || blokada == true) return;
    if (nr == poprzedniaKarta) return;

    const obraz = "url(./img/" + karty[nr] + ".png)";
    $('#karta' + nr).css('background-image', obraz);
    $('#karta' + nr).addClass('active');

    if (pierwszaWidoczna == false) {
        poprzedniaKarta = nr;
        pierwszaWidoczna = true;
    } else {
        if (karty[poprzedniaKarta] == karty[nr]) {
            blokada = true;
            setTimeout(function () { ukryjKarty(nr, poprzedniaKarta) }, 750)
        } else {
            blokada = true;
            setTimeout(function () { odwrocKarty(nr, poprzedniaKarta) }, 1000)
        }

        pierwszaWidoczna = false;
        runda++;
        document.getElementById('wynik').innerHTML = "Runda: " + runda;
    }

}

function ukryjKarty(nr1, nr2) {
    document.getElementById("karta" + nr1).style.opacity = 0;
    document.getElementById("karta" + nr2).style.opacity = 0;
    pozostalePary--;

    if(pozostalePary == 0) {
        document.getElementById("plansza").innerHTML = '<br><br><span class="wygrana">Wygrałeś!</span><br><p>Gratulacje udało Ci sie znaleść wszystkie pary.</p><br><br><br><span class="restart" onclick="location.reload()">Zagraj ponownie</span>'
    }

    blokada = false;
}

function odwrocKarty(nr1, nr2) {
    $('#karta' + nr1).css('background-image', "url(./img/karta.png)");
    $('#karta' + nr1).removeClass('active');
    $('#karta' + nr2).css('background-image', "url(./img/karta.png)");
    $('#karta' + nr2).removeClass('active');
    blokada = false;
}