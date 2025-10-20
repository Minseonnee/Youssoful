$(function () {
    $(".slide li").hide();
    $(".slide li:nth-child(1)").show();
    setInterval(function () {
        $(".slide li:nth-child(1)").fadeOut(1000).next().fadeIn(1000).end().appendTo(".slide")
    }, 4000);
});

$('.btn-menu').on('click', function () {
    $('body').addClass('nav-open');
});
$('.mnav .close, .dim').on('click', function () {
    $('body').removeClass('nav-open');
});
$('.btn-search').on('click', function () {
    alert('검색 준비중! 조금만 기다려~');
});

$(function () {
  // 고정 헤더 높이만큼 보정(메뉴 가려짐 방지)
  function headerOffset() {
    // 고정값이면 60으로, 동적으로 잡으려면 아래처럼
    return $('.header_inner').outerHeight() || 60;
  }

  // 공통: GNB/모바일 메뉴의 해시 링크 클릭 시 부드럽게 이동
  $('.gnb a[href^="#"], .mnav a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');
    if (target.length > 1 && $(target).length) {
      e.preventDefault();
      var top = $(target).offset().top - headerOffset();

      $('html, body').stop().animate({ scrollTop: top }, 600, 'swing');

      // 모바일 메뉴 열려 있으면 닫기
      $('body').removeClass('nav-open');
      $('.mnav').attr('aria-hidden', 'true');
      $('.dim').remove(); // dim 있으면 제거
    }
  });

  // 모바일 메뉴 열기 버튼
  $('.btn-menu').on('click', function () {
    $('body').addClass('nav-open');
    $('.mnav').attr('aria-hidden', 'false');
    // 딤 추가(없으면)
    if (!$('.dim').length) $('body').append('<div class="dim" aria-hidden="true"></div>');
  });

  // 모바일 메뉴 닫기(닫기 버튼/딤 클릭)
  $('.mnav .close').on('click', closeNav);
  $('body').on('click', '.dim', closeNav);

  function closeNav() {
    $('body').removeClass('nav-open');
    $('.mnav').attr('aria-hidden', 'true');
    $('.dim').remove();
  }

  // 페이지를 해시로 직접 열었을 때도 스크롤 보정
  if (location.hash && $(location.hash).length) {
    setTimeout(function () {
      var top = $(location.hash).offset().top - headerOffset();
      $(window).scrollTop(top);
    }, 0);
  }
});