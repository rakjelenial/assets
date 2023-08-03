var pkpSidebar = $('.pkp_structure_sidebar')

$(document).ready(function () {
  // initCurrentIssue();
  runOnStart();
})

function runOnStart() {
  initAboutJournal();
  initSwiperAnnouncement();
  initMobileNavbar();
  navActivePage();
  hideBreadCrumpsOnMobile();
  runOnArticlePage();
  runOnIndexPage();
  movePlumX();
  initEditorialPick();
  autoScrollMiniCard()

  addAndRemoveClass();
  initTouchMenuLA();

  $('.overlay').fadeOut().remove();
}

function movePlumX() {
  // setTimeout(function () {

  // let plumx = $('.PlumX-Summary');
  // if (!plumx.length) return;

  // plumx.addClass('bg-white dark:bg-gray-800 mt-4 lg:mb-4 lg:ms-4 lg:shadow-lg border-primary-bottom border-b-8');

  // plumx.appendTo('.pkp_structure_sidebar');

  // }, 1000);
}

function initSwiperAnnouncement() {
  if ($('.swiper-container').length > 0) {
    var AnnouncementSwiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 3000,
      },

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoHeight: true,
    })
  }
}

function runOnIndexPage() {
  if ($("#tab-about-journal").length < 1) {
    setTimeout(function () {
      $(".announcement-noble").trigger("click");
    }, 100);
  }
}

function runOnArticlePage() {
  if ($(".page_article").length < 1) return;

  pkpSidebar.children().remove();

  // moveElementToBlock($('.crossmark'), 'Crossmark')
  moveElementToBlock($(".dimension_badge"));
  moveElementToBlock($(".galleys"));
  // moveElementToBlock($('.cover_image'))
  moveElementToBlock($(".item.issue .issue"));
  moveElementToBlock($(".item.issue .section"));
  moveElementToBlock($(".item.published"));
  moveElementToBlock($(".keywords"));
  moveElementToBlock($(".PlumX-Summary"));

  // moveElementToBlock($('.item.doi .value'), 'DOI')

  // Remove unused element after its child got moved
  $(".item.issue").remove();
  // $('.item.doi').remove();
}


function moveElementToBlock(elm, title, first) {
  if (elm.length < 1) return;
  title = title ?? elm.attr('title');


  let div = $('<div>');
  div.addClass('pkp_block')

  if (title) {
    div.append(`<h2 class="mb-4 font-bold title">${title}</h2>`)
  }

  div.append(elm)

  if (first) {
    pkpSidebar.prepend(div);
  } else {
    pkpSidebar.append(div);
  }

}

function addAndRemoveClass() {
  $('.pkp_block').addClass('bg-white dark:bg-gray-800 mt-4 lg:mb-4 lg:ms-4 lg:shadow-lg border-primary-bottom border-b-8');
  $('.pkp_block').first().removeClass('mt-4')
  // $('.pkp_block').last().removeClass('lg:mb-4')
  $('#navigationPrimary').children().first().addClass('lg:pl-3');
  $('#navigationPrimary').children().last().addClass('lg:pr-3');
  $('#navigationPrimary').children().addClass('transition duration-300 ease-in-out');
  // $('div.content span.item').addClass('hvr-forward hvr-icon-wobble-horizontal');
  $('#tab-announcement').addClass('hidden');
}

function initCurrentIssue() {
  if ($('.second-header').length < 1) return;

  let cover = $('.heading .cover')
  let headingIssue = $('.heading')
  let titleIssue = $('.current_issue_title')

  headingIssue.addClass('text-white')
  titleIssue.addClass('text-white font-bold text-xl mb-4')
  headingIssue.children().addClass('lg:mb-4')

  $('.current_issue').children('h2').remove()

  $('.cover-issue').append(cover);
  $('.text-issue').append(titleIssue).append(headingIssue)

}

function hideBreadCrumpsOnMobile() {
  if ($('.cmp_breadcrumbs').length < 1) return;

  $('.cmp_breadcrumbs').addClass('lg:block hidden');
}


function navActivePage() {
  let li = $('.pkp_navigation_primary').children();
  li.each(function () {
    let current_li = $(this);
    if (current_li.children('a').attr('href') == window.location.href) current_li.addClass('active');
    if (current_li.children('a').attr('href') == '#') {
      current_li.children('a').next().children().each(function () {
        if ($(this).children('a').attr('href') == window.location.href) current_li.addClass('active');
      })
    }
  })
}

function changeActiveTab(event, tabID) {
  let element = event.target;
  while (element.nodeName !== "A") {
    element = element.parentNode;
  }
  ulElement = element.parentNode.parentNode;
  aElements = ulElement.querySelectorAll("li > a");
  tabContents = document.getElementById("tabs-id").querySelectorAll(".tab-content > div");
  for (let i = 0; i < aElements.length; i++) {
    aElements[i].classList.remove("text-white");
    aElements[i].classList.remove("bg-base");
    aElements[i].classList.remove("hover:text-white");
    // aElements[i].classList.add("bg-white");
    tabContents[i].classList.add("hidden");
    tabContents[i].classList.remove("block");
  }
  // element.classList.remove("bg-white");
  element.classList.add("text-white");
  element.classList.add("hover:text-white");
  element.classList.add("bg-base");
  document.getElementById(tabID).classList.remove("hidden");
  document.getElementById(tabID).classList.add("block");
}

function cl(elm) {
  console.log(elm)
}

if ($('.pkp_noble_toggle').length > 0) {
  document.getElementsByClassName("switch")[0].addEventListener("click", () => {
    if (toggle) {
      animate.restart();
    } else {
      animate.reverse();
    }
    toggle = !toggle;
    toggleTheme();
  });
}

function initMobileNavbar() {
  let nav = $('.mobile-primary-menu');
  let subMenu = nav.find("li").find("ul");
  if (subMenu.length) {
    // subMenu.parent().addClass('flex items-center')
    subMenu.css("display", "none");
    $(
      `<i class="fa fa-sort-down dropdown-menu-icon ms-auto" aria-hidden="true"></i>`
    ).insertBefore(subMenu);
    let dropDownMenuIcon = $(".dropdown-menu-icon");
    dropDownMenuIcon.click(function () {
      $(this).next("ul").fadeToggle();
      $(this).toggleClass("fa fa-sort-up fa fa-sort-down");
    });
  }
}

function initAboutJournal() {
  let dom = $("#tab-about-journal");
  if (dom.length) {
    dom.find(".grid").removeAttr("style");
  }
}

function initEditorialPick() {
  // moving editorialpick
  let ep = $('.editorial_pick_as_card');

  if (ep.length < 1) return;

  let ep_card = $('#noble-ep');
  ep_card.append(ep.children());
  ep.remove();
}

function autoScrollMiniCard() {
  if ($('.mini-card').length < 1) return;

  var timeHoverCard;

  $('.mini-card').hover(
    function () {
      var card = this;
      if (timeHoverCard) {
        clearTimeout(timeHoverCard);
      }
      timeHoverCard = setTimeout(function () {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
      }, 300);
    },
    function () {
      if (timeHoverCard) {
        clearTimeout(timeHoverCard);
      }
    }
  )
}

function initTouchMenuLA() {
  if ($('body').attr('dir') == 'rtl') {
    var TouchMenuRTL = TouchMenuLARTL({
      target: document.getElementById('menu-mobile'),
      width: 300,
      onOpen: function () {
        $(document.body).addClass('overflow-hidden');
      },
      onClose: function () {
        $(document.body).removeClass('overflow-hidden');
      }
    });

    document.getElementById('menu-open').addEventListener('click', function () {
      TouchMenuRTL.toggle();
    });
    return;
  }

  var TouchMenu = TouchMenuLA({
    target: document.getElementById('menu-mobile'),
    width: 300,
    onOpen: function () {
      $(document.body).addClass('overflow-hidden');
    },
    onClose: function () {
      $(document.body).removeClass('overflow-hidden');
    }
  });

  document.getElementById('menu-open').addEventListener('click', function () {
    TouchMenu.toggle();
  });
}