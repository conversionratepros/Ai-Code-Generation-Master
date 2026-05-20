function headerHandler() {
  if (window.pageYOffset > 10) {
    document.body.classList.add('is--header-bg');
  } else {
    document.body.classList.remove('is--header-bg');
  }
}

window.addEventListener('resize', headerHandler);
window.addEventListener('scroll', headerHandler);
document.addEventListener('DOMContentLoaded', headerHandler);