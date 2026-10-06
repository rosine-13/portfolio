// =========================
// Menu mobile (burger)
// =========================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Ferme le menu quand on clique sur un lien
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// =========================
// Bouton Retour en haut
// =========================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =========================
// Compteurs animés (chiffres clés)
// =========================
const statNumbers = document.querySelectorAll(".stat-number");

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    let current = 0;
    const duration = 1500;      // durée totale en ms
    const stepTime = 30;        // une mise à jour toutes les 30ms
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const update = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current);
            setTimeout(update, stepTime);
        } else {
            el.textContent = target;
        }
    };

    update();
};

// Lancer l'animation quand la section devient visible
if (statNumbers.length > 0) {
    const statsSection = document.querySelector(".stats");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(num => animateCounter(num));
                observer.unobserve(entry.target);   // une seule fois
            }
        });
    }, { threshold: 0.2 });

    if (statsSection) {
        observer.observe(statsSection);
    } else {
        // Fallback : si la section n'est pas trouvée, on anime direct
        statNumbers.forEach(num => animateCounter(num));
    }
}

// =========================
// Envoi de formulaire EmailJS
// =========================
emailjs.init("Jp66gG16NNAkkgBSA");

const form = document.getElementById("contact-form");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const serviceID = "service_62zjpng";
        const templateID = "template_0cmlfg9";

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert("Votre message a bien été envoyé !");
                form.reset();
            }, (error) => {
                alert("Erreur lors de l'envoi : " + JSON.stringify(error));
            });
    });
}
