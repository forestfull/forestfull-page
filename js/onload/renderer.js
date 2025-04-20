const mainHeader = document.getElementById('main-header');
const mainFooter = document.getElementById('main-footer');
const mainSection = document.getElementById('main-section');
const contextPath = location.pathname.indexOf('/forestfull-page') === 0 ? '/forestfull-page' : '';

function goPage(uri) {
    fetch(contextPath + '/page' + uri + '.xml')
        .then(async res => {
            if (!res.ok) throw new Error(res.statusText);

            if (uri !== '/home')
            history.pushState(res.text(), document.title + '(' + uri + ')', uri);

            mainSection.innerHTML = await res.text();
        })
        .catch(err => console.error(err))
        ;
}


window.addEventListener('keydown', e => {
    if (e.key === 'F5') {
        e.preventDefault();
        if (location.pathname !== '' && location.pathname !== undefined && location.pathname !== null) {
            goPage(location.pathname);
        } else {
            location.href = '/';
        }
    }
    // TODO: mac 도 추가 필요
});

window.onpopstate = function (event) {
    mainSection.innerHTML = e.state;
}