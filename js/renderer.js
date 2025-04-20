const mainHeader = document.getElementById('main-header');
const mainFooter = document.getElementById('main-footer');
const mainSection = document.getElementById('main-section');

const contextPath = location.pathname.indexOf('/forestfull-page') === 0 ? '/forestfull-page' : '';
const skeletonBufferMap = {} //TODO: 스켈레톤 방식 띄우는 동안 기존 데이터 잠시 저장할 맵

function loadingProgress(onOff) {

}

async function goPage(uri) {
    const pageXml = await fetch(contextPath + '/page' + uri + '.xml')
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.text();
        })
        .catch(err => {
            console.error(err);
            loadingProgress(false);
            return undefined;
        });

    if (pageXml === undefined) return;

    let subTitle = ' - ' + uri.substring(1, uri.length);
    let pathName = contextPath + uri;

    if (uri === '/home') {
        subTitle = '';
        pathName = contextPath;
    }

    mainSection.innerHTML = pageXml;
    history.pushState(pageXml, document.title + subTitle, pathName);
}

/**
 * 렌더링 시작할 때
 */
(function init() {


})();


/**
 * 렌더링 완료 후
 */
window.onload = function () {
    window.addEventListener('keydown', e => {
        if (e.key === 'F5') {
            e.preventDefault();
            goPage(location.pathname);
        }
        // TODO: mac 도 추가 필요
    });

    window.onpopstate = function (e) {
        mainSection.innerHTML = e.state;
    }
}