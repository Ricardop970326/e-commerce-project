const carousel = document.querySelector('.carousel');
firstImg = carousel.querySelectorAll('img')[0];
arrowIcons = document.querySelectorAll('.wrap i');

// carousel slide show

let isDragStart = false, prevPageX, prevScrollLeft;
 
const showHideIcons = () => {
  // show and hide icon of right and left arrows
  let scrollwidth = carousel.scroolwidth = carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
  arrowIcons[1].style.display = carousel.scrollLeft == scrollwidth ? 'none' : 'block';

}


arrowIcons.forEach(icon =>{
  icon.addEventListener('click', () =>{
    let firstImgWidth = firstImg.clientWidth + 14; // first img width & adding 14px margin
    // reduce the value of the icon width if click left else add to it
      carousel.scrollLeft += icon.id  == 'left' ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60); // call showhideicpns after 60
        
  });
});

const dragStart = (e) =>{
// updating global var on mouse down event
isDragStart = true
prevPageX = e.pageX || e.touches[0].pageX;
prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) =>{
  if(!isDragStart) return;
  e.preventDefault();
  carousel.classList.add('dragging');
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons()
}

const dragStop = () => {
  isDragStart = false
  carousel.classList.remove('dragging');
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);
