// display mode 
let lightmode = localStorage.getItem('lightmode');
const themeSwitch = document.getElementById('theme-switch', 'image-switch', 'dropdown-switch');
const mobilethemeSwitch = document.getElementById('mobile-theme-switch');

const enableLightmode = () => {
  document.body.classList.add('lightmode');
  localStorage.setItem('lightmode', 'active');
}

const disableLightmode = () => {
  document.body.classList.remove('lightmode');
  localStorage.setItem('lightmode', null);
}

if(lightmode === 'active') enableLightmode();

themeSwitch.addEventListener('click', () => {
  console.log('theme switch button clicked');

  lightmode = localStorage.getItem('lightmode');
  lightmode !== 'active' ? enableLightmode() : disableLightmode();

  console.log('switched display mode');
});

mobilethemeSwitch.addEventListener('click', () => {
  lightmode = localStorage.getItem('lightmode');
  lightmode !== 'active' ? enableLightmode() : disableLightmode();
})