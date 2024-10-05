/* previous dropdown javascript, doesn't work 
// dropdown menu for display width less than 780px (mobile)
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            menu.classList.remove('menu-open');  // closes menu after selecting one
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});
// close dropdown if clicking outside of it
window.addEventListener('click', (e) => {
    if (!select.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('menu-open');
    }
});
*/


// dropdown menu for display width less than 780px (mobile)
const dropdownButton = document.querySelector('.select');  // dropdown button
const menu = document.querySelector('.menu');  // dropdown menu

// toggle dropdown menu visibility on button click
dropdownButton.addEventListener('click', () => {
    menu.classList.toggle('open-menu');  // toggle the 'menu-open' class to show/hide the menu
});

// close dropdown if clicking outside of it
window.addEventListener('click', (e) => {
    if (!dropdownButton.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open-menu'); // close the menu if clicked outside
    }
});
