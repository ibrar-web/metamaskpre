var mon = 0,
    wip,
    bon,
    minb,
    maxb,
    gamb;
console.log('mo');

const getData = async() => {
    await $.post("detail", { _token: $('meta[name=csrf-token]').attr('content'), id: 18 }, function(t) {
        mo = t;
        console.log(mo, 'info0');
        // wp = [],
        // bo = [],
        // mib = [],
        // mab = [],
        // gab = [];
    });
}
getData();
console.log(mo);