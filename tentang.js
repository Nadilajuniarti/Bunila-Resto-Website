const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) toggle.addEventListener("click", () => {
  links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", links.classList.contains("open"));
});

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("open");
    const expanded = item.classList.contains("open");
    button.setAttribute("aria-expanded", expanded);
    button.querySelector("span").textContent = expanded ? "−" : "+";
  });
});
