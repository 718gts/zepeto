$(document).ready(function(){
    var ZEPETO_DOWNLOAD_URL = {
        ios: 'https://itunes.apple.com/app/id1350301428',
        android: 'https://play.google.com/store/apps/details?id=me.zepeto.main',
    };

    var EDownloadLinkMethodType = {
        ios: 'ios',
        android: 'android',
        useragent: 'useragent',
    };

    function moveToDownloadLink(method) {
        var methodType = (method || '').toLowerCase();

        switch(methodType) {
            case EDownloadLinkMethodType.ios: 
                window.open(ZEPETO_DOWNLOAD_URL.ios);
                break;

            case EDownloadLinkMethodType.android:
                window.open(ZEPETO_DOWNLOAD_URL.android);
                break;

            case EDownloadLinkMethodType.useragent:
            default:
                var userAgent = window.navigator.userAgent;
                if (userAgent.match(/iPhone/) || userAgent.match(/iPad/)) {
                    moveToDownloadLink(EDownloadLinkMethodType.ios);
                } else if (userAgent.match(/Android/)) {
                    moveToDownloadLink(EDownloadLinkMethodType.android);
                }
                break;
        }
    }

    function createDownloadLinkClickEventHandler(method) {
        return function(e) {
            e.preventDefault();
            moveToDownloadLink(method);
        }
    }

    $('a.appstore').click(createDownloadLinkClickEventHandler(EDownloadLinkMethodType.ios));
    $('a.googleplay').click(createDownloadLinkClickEventHandler(EDownloadLinkMethodType.android));
    $('a.download_btn').click(createDownloadLinkClickEventHandler(EDownloadLinkMethodType.useragent));

    var $langSelectBox = $('.lang_select_box');
    $(document).click(function(){
        $langSelectBox.removeClass('on');
    });
    $langSelectBox.click(function(e){
        e.stopPropagation();
        $(this).toggleClass('on');
    });

    // 언어 선택 박스 Li 클릭시 a href로 redirect
    var $langSelectBoxLi = $('.lang_select_box ul.select_list > li');
    $langSelectBoxLi.click(function(e){
        var child = $(this).find('a');
        var nextLocation = child.attr('href');
        window.location = nextLocation;
    });
    
    //모바일 햄버거 메뉴 클릭 이벤트
    var $homeMenu = document.querySelector('.home_menu');
    var $btnHamber = document.querySelector('.btn_home_hamber');
    $btnHamber.addEventListener('click', function(){
      $homeMenu.classList.toggle('on');
      // html 고정
      $('html').addClass('on')
      $('body').addClass('on')
    });

    //모바일 햄버거 메뉴 닫기
    $('.close_btn').click(function(){
        $(this).parent().parent().removeClass('on');
          // html 고정 해제
          $('html').removeClass('on')
          $('body').removeClass('on')
    });
})