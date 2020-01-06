/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections, 
    navbarMenu, 
    navbarList,
    header,
    headerTimeout,
    toTop;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function removeAnchorActiveClass() {
    for(let listItem of navbarList.childNodes) {
        listItem.firstChild.classList.remove('active');
    }
}

function toggleAnchorActiveClass(anchor) {
    anchor.classList.toggle('active');
}

function removeSectionActiveClass() {
    for(let section of sections) {
        section.classList.remove('your-active-class');
    }
}

function toggleSectionActiveClass(section) {
    section.classList.toggle('your-active-class');
}

// Apply active styling based on active section
function setActiveSection(section) {
    let anchor = document.querySelector('a[data-section="'+section.id+'"]');

    removeSectionActiveClass();
    toggleSectionActiveClass(section);
    removeAnchorActiveClass();
    toggleAnchorActiveClass(anchor);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    setActiveSection(sections[0]);
}

// Hide navigation menu after 3 second delay
function startHeaderTimeout() {
    if(headerTimeout) clearTimeout(headerTimeout);

    header.classList.remove('hidden');
    headerTimeout = setTimeout(() => {
        header.classList.add('hidden');
    }, 3000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigation() {
    let menuFragment = document.createDocumentFragment();

    for(let i = 0; i < sections.length; i++) {
        let listItem = document.createElement('li');
        let listItemText = sections[i].attributes["data-nav"].value;

        listItem.innerHTML = '<a href="#" class="menu__link'+(i === 0 ? ' active' : '')+'" data-section="'+sections[i].id+'">'+listItemText+'</a>';
        menuFragment.appendChild(listItem);
    }

    navbarList.appendChild(menuFragment);
}

// Add class 'active' to section when near top of viewport
function addWindowScrollHandler() {
    window.addEventListener('scroll', () => {

        // Hide navigation menu when scrolling stops
        startHeaderTimeout();

        for(let section of sections) {
            if (section.offsetTop <= window.scrollY && window.scrollY <= section.offsetTop + section.clientHeight/3) {
                setActiveSection(section);
            }
        }

        // Hide "Top" navigation until scroll beyond top of first section
        if(window.scrollY > sections[0].offsetTop) {
            toTop.classList.remove('hidden');
        } else {
            toTop.classList.add('hidden');
        }
    });
}

// Scroll to anchor ID using scrollTO event
function addNavbarClickHandler() {
    navbarList.addEventListener('click', (ev) => {
        ev.preventDefault();

        if(ev.target.className === "menu__link") {
            let anchor = ev.target;
            let section = document.getElementById(anchor.attributes["data-section"].value);

            setActiveSection(section);
            window.scrollTo({
                top: section.offsetTop,
                left: 0,
                behavior: 'smooth'
            }); // scroll to top of section
        }
    });
}

function addToTopClickHandler() {
    toTop.addEventListener('click', (ev) => {
        scrollToTop();
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Ensure DOM is ready then build navigation and set event handlers
document.addEventListener('DOMContentLoaded', (ev) => {
    sections = document.querySelectorAll('section');
    navbarMenu = document.querySelector('.navbar__menu');
    navbarList = document.querySelector('#navbar__list');
    header = document.querySelector('.page__header');
    toTop = document.querySelector('.to-top');
    // Build menu
    buildNavigation();

    // Scroll to section on link click
    addNavbarClickHandler();

    addToTopClickHandler();

    // Set sections as active
    addWindowScrollHandler();
});