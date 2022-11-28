
//window on load event 
window.onload = () => {

const details = document.querySelectorAll("details");

details.forEach (targetDetail => {
    targetDetail.addEventListener("toggle", closeDetails);
});

function closeDetails() {
    if (this.open) {
        details.forEach(detail => {
            if (detail !== this) {
                detail.removeAttribute("open");
            }
        });

        const summary = this.querySelector("summary");
        const input = summary.querySelector("input");
        const p = summary.querySelector("p");
        const span = summary.querySelector("span");
        span.classList.add("rotate");
        p.classList.add("hidden");
        input.classList.add("active");
        //input focus 
        input.focus();
    } else {
        const summary = this.querySelector("summary");
        const input = summary.querySelector("input");
        const span = summary.querySelector("span");
        const p = summary.querySelector("p");
        input.classList.remove("active");
        p.classList.add("active");
        p.classList.remove("hidden");
        span.classList.remove("rotate");
    }
}
}



