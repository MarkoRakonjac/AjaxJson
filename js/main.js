let headTr = $('#head-tr');
let tBody = document.querySelector('#tbody');
let jumbotron = $('.jumbotron');
let allBtn = $('a');
let title = $('.title');
let table = $('.table');
let loading = $('.loading');


allBtn.on('click', getData);


$(window).on('load', inicialFun);

function inicialFun() {
    $(loading).show()
    $.ajax({
            url: 'http://mysafeinfo.com/api/data?list=bestnovels&format=json',
            type: 'GET',
            dataType: 'json',

        })
        .done(function(data) {
            displayTable(data);
        })

}

function displayTable(data) {
    let first = data[0];
    let text = '';
    for (prop in first) {
        text += '<th>' + prop + '</th>';
    }
    text += '<th>' + "read" + '</th>';
    headTr.html(text)
    text = '';
    data.forEach(function(el) {
        text += '<tr>';
        for (prop in el) {
            text += '<td>' + el[prop] + '</td>';
        }
        if (el.tt) {
            text += '<td><a href="https://en.wikipedia.org/wiki/' + el.tt + '" target="blank" class="btn btn-xs btn-danger">More...</a></td>';
            $(jumbotron).css({
                "background-image": "url(img/booksbg.jpg)",
            });
        }
        if (el.nm && el.pp) {
            text += '<td><a href="https://en.wikipedia.org/wiki/' + el.nm + '" target="blank" class="btn btn-xs btn-danger">More...</a></td>';
            $(jumbotron).css({
                "background-image": "url(img/presidentsbg.jpg)",
            });

        }
        if (el.sym) {
            text += '<td><a href="https://en.wikipedia.org/wiki/' + el.nm + '" target="blank" class="btn btn-xs btn-danger">More...</a></td>';
            $(jumbotron).css({
                "background-image": "url(img/elementsbg.jpg)",
            });

        }
        if (el.nm && el.cd) {
            text += '<td><a href="https://en.wikipedia.org/wiki/' + el.nm + '" target="blank" class="btn btn-xs btn-danger">More...</a></td>';
            $(jumbotron).css({
                "background-image": "url(img/citybg.jpeg)",
            });
        }
        if (el.gm) {
            text += '<td><a href="https://en.wikipedia.org/wiki/' + el.gm + '" target="blank" class="btn btn-xs btn-danger">More...</a></td>';
            $(jumbotron).css({
                 "background-image": "url(img/nflbg.jpg)",
            });
        }

        text += '</tr>';
        tBody.innerHTML = text;
    })
    $(loading).hide()
    table.show();

}


function getData(e) {
    $(table).hide();
    $(loading).show();
    title.html($(this).html());
    e.preventDefault();
    $('li').removeClass('active');
    $(this).parent().addClass('active')
    let url = $(this).attr('href');
    $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',

        })
        .done(function(data) {
            displayTable(data);
        });

}