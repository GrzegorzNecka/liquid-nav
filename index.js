import './style.css';

waitFor(function() {
  return document.querySelector('.search__results');
}, runVariant);

function waitFor(condition, callback) {
  var value = condition();

  if (value) return callback(value);

  return window.setTimeout(waitFor, 50, condition, callback);
}

function runVariant() {
  var config = { attributes: false, childList: true, subtree: false };
  var observer = new MutationObserver(observerCallback);
  //var section = document.querySelector('#page-search > section');
  //if (section) section.classList.remove('section--lightAlt');

  insertTabs();
  showFirstSection();

  observer.observe(document.getElementById('search-results'), config);
}

function insertBtns(tabs) {
  document.querySelector('[data-category="all"]')
    ? insertButton(tabs, 'Top Results')
    : deleteBtn(tabs, 'Top Results');

  document.querySelector('[data-category="games"]')
    ? insertButton(tabs, 'Games')
    : deleteBtn(tabs, 'Games');

  document.querySelector('[data-category="pages"]')
    ? insertButton(tabs, 'Pages')
    : deleteBtn(tabs, 'Pages');

  document.querySelector('[data-category="support"]')
    ? insertButton(tabs, 'Support')
    : deleteBtn(tabs, 'Support');

  insertButtonBackground(tabs, 'background');
}

function deleteBtn(tabsContainer, name) {
  var button = document.querySelector('search-results__tabs--tab-' + btnName);
  var btnName =
    name === 'Top Results' ? 'all' : name.toLowerCase().replace(/\s/g, '');

  if (button) {
    tabsContainer.removeChild(button);
  }
}

function insertButton(tabsContainer, name) {
  var btnName =
    name === 'Top Results' ? 'all' : name.toLowerCase().replace(/\s/g, '');
  if (!document.querySelector('search-results__tabs--tab-' + btnName)) {
    var button = document.createElement('button');

    button.setAttribute(
      'class',
      'search-results__tabs--tab search-results__tabs--tab-' + btnName
    );

    button.innerHTML = name;
    tabsContainer.appendChild(button);

    button.addEventListener('click', function() {
      showSection(btnName);
    });
  }
}

function insertButtonBackground() {}

function insertTabs() {
  var searchResultsSection = document.querySelector('#page-search > section');
  var hoverElem = document.createElement('div');
  hoverElem.classList.add('hover-elem');
  var tabsContainer = document.createElement('div');
  tabsContainer.setAttribute('id', 'search-results__tabscontainer');
  var tabs = document.createElement('div');
  tabs.setAttribute('id', 'search-results__tabs');
  tabs.appendChild(hoverElem);

  tabsContainer.appendChild(tabs);

  insertBtns(tabs);

  var searchResults = document.getElementById('search-results');

  searchResultsSection.insertBefore(tabsContainer, searchResults);
}

function makeTabActive(tab) {
  if (tab) tab.classList.add('search-results__tabs--tab-active');
}

function makeTabUnactive(tab) {
  if (tab) tab.classList.remove('search-results__tabs--tab-active');
}

function show(elem) {
  if (elem) elem.style.display = 'block';
}

function hide(elem) {
  if (elem) elem.style.display = 'none';
}

function hideAllSections() {
  var sections = document.querySelectorAll('[data-category]');
  for (var i = 0; i < sections.length; i++) {
    hide(sections[i]);
  }
}

function showSection(section) {
  hideAllSections();
  show(document.querySelector('[data-category="' + section + '"]'));

  var tabs = document.querySelectorAll('.search-results__tabs--tab');
  for (var i = 0; i < tabs.length; i++) {
    makeTabUnactive(tabs[i]);
  }

  makeTabActive(
    document.querySelector('.search-results__tabs--tab-' + section)
  );
}

function showFirstSection() {
  var section = document.querySelector('[data-category]');
  if (section) {
    var sectionName = section.getAttribute('data-category');
  }
  showSection(sectionName);
}

function changeTabs() {
  deleteTabs();
  insertTabs();
  showFirstSection();
}

function deleteTabs() {
  var searchResultsSection = document.querySelector('#page-search > section');
  var tabs = document.getElementById('search-results__tabscontainer');

  searchResultsSection.removeChild(tabs);
}

function observerCallback() {
  changeTabs();
}

// ---------- hovering

const searchResultTabs = document.getElementById('search-results__tabs');
const hoverElem = document.querySelector('.hover-elem');

function setHoverEffect(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const button = e.target;
  const buttonLeft = button.offsetLeft;
  const buttonWidth = button.offsetWidth;
  console.log(buttonWidth);

  hoverElem.style.transform = `translateX(${buttonLeft}px)`;
  hoverElem.style.width = `${buttonWidth}px`;

  console.dir(e);
}

searchResultTabs.addEventListener('mouseover', setHoverEffect);
