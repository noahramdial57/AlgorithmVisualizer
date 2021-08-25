let link = document.querySelector(".pathfindingContainer");
let transition = document.querySelector(".rightTransition");
let link2 = document.querySelector(".sortingContainer");
let transition2 = document.querySelector(".leftTransition");

link.addEventListener("click", (e) => {
  e.preventDefault();
  transition.classList.add("slide");
  setTimeout(() => {
    window.location = link.href;
  }, 900);
});

link2.addEventListener("click", (e) => {
  e.preventDefault();
  transition2.classList.add("slide");
  setTimeout(() => {
    window.location = link2.href;
  }, 900);
});