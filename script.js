// Translations object
const translations = {
    fr: {
        'nav-about': 'About',
        'nav-experience': 'Experiences',
        'nav-projects': 'Projets',
        'nav-contact': 'Contact',
        'language': 'Langue',
        'greeting': 'Bonjour, je suis',
        'job-title': 'Développeur Full Stack',
        'download-cv': 'Télécharger CV',
        'contact-btn': 'Contact',
        'learn-more': 'En savoir plus',
        'about-title': 'À propos de moi',
        'experience': 'Expériences',
        'years-exp': '3 ans',
        'education': 'Formation',
        'education-details': 'BTS SIO option SLAM (Services Informatiques aux Organisations)<br />Actuellement en 3ème année Bachelor DevOps Fullstack (l\'Epsi d\'ARRAS)',
        'about-text': 'Développeur Full Stack passionné, je crée des applications web et mobiles tout en m\'intéressant aux bonnes pratiques DevOps. Mon parcours m\'a permis de travailler sur différents projets et de développer mes compétences techniques et organisationnelles. Ce portfolio présente mes réalisations et la manière dont j\'aborde chaque projet. Bonne visite !',
        'discover-projects': 'Découvrez mes projets',
        'experience-title': 'Expériences',
        'frontend-mobile': '👉 Développement Frontend et <br />👉 Mobile',
        'backend': '👉 Développement Backend',
        'exp-level': 'Expérience',
        'intermediate': 'Intermédiaire',
        'basic': 'Basique',
        'explore-recent': 'Explorer mes récents',
        'projects-title': 'Projets',
        'project-one': 'Projet Un',
        'project-two': '<br /><br /><br /><br />Projet Deux',
        'project-three': '<br /><br /><br />Projet trois',
        'contact-me': 'Contactez-moi ✅',
        'contact-title': 'Contact'
    },
    en: {
        'nav-about': 'About',
        'nav-experience': 'Experience',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'language': 'Language',
        'greeting': 'Hello, I am',
        'job-title': 'Full Stack Developer',
        'download-cv': 'Download CV',
        'contact-btn': 'Contact',
        'learn-more': 'Learn more',
        'about-title': 'About Me',
        'experience': 'Experience',
        'years-exp': '3 years',
        'education': 'Education',
        'education-details': 'BTS SIO option SLAM (Computer Services for Organizations)<br />Currently in 3rd year Bachelor DevOps Fullstack (Epsi Arras)',
        'about-text': 'Passionate Full Stack Developer, I create web and mobile applications while interested in DevOps best practices. My journey has allowed me to work on various projects and develop my technical and organizational skills. This portfolio showcases my achievements and how I approach each project. Enjoy your visit!',
        'discover-projects': 'Discover my projects',
        'experience-title': 'Experience',
        'frontend-mobile': '👉 Frontend & <br />👉 Mobile Development',
        'backend': '👉 Backend Development',
        'exp-level': 'Experienced',
        'intermediate': 'Intermediate',
        'basic': 'Basic',
        'explore-recent': 'Explore my recent',
        'projects-title': 'Projects',
        'project-one': 'Project One',
        'project-two': '<br /><br /><br /><br />Project Two',
        'project-three': '<br /><br /><br />Project Three',
        'contact-me': 'Contact me ✅',
        'contact-title': 'Contact'
    },
    es: {
        'nav-about': 'Acerca de',
        'nav-experience': 'Experiencia',
        'nav-projects': 'Proyectos',
        'nav-contact': 'Contacto',
        'language': 'Idioma',
        'greeting': 'Hola, soy',
        'job-title': 'Desarrollador Full Stack',
        'download-cv': 'Descargar CV',
        'contact-btn': 'Contacto',
        'learn-more': 'Saber más',
        'about-title': 'Sobre mí',
        'experience': 'Experiencia',
        'years-exp': '3 años',
        'education': 'Formación',
        'education-details': 'BTS SIO opción SLAM (Servicios Informáticos para Organizaciones)<br />Actualmente en 3er año de Bachelor DevOps Fullstack (Epsi Arras)',
        'about-text': 'Desarrollador Full Stack apasionado, creo aplicaciones web y móviles mientras me intereso en las mejores prácticas DevOps. Mi trayectoria me ha permitido trabajar en varios proyectos y desarrollar mis habilidades técnicas y organizativas. Este portafolio presenta mis logros y cómo abordo cada proyecto. ¡Disfruta tu visita!',
        'discover-projects': 'Descubre mis proyectos',
        'experience-title': 'Experiencia',
        'frontend-mobile': '👉 Desarrollo Frontend y <br />👉 Móvil',
        'backend': '👉 Desarrollo Backend',
        'exp-level': 'Experiencia',
        'intermediate': 'Intermedio',
        'basic': 'Básico',
        'explore-recent': 'Explora mis recientes',
        'projects-title': 'Proyectos',
        'project-one': 'Proyecto Uno',
        'project-two': '<br /><br /><br /><br />Proyecto Dos',
        'project-three': '<br /><br /><br />Proyecto Tres',
        'contact-me': 'Contáctame ✅',
        'contact-title': 'Contacto'
    }
};

// Current language
let currentLanguage = 'fr';

// Toggle Menu Function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Toggle Language Dropdown
function toggleLanguageDropdown(location = 'desktop') {
    let dropdownId;
    if (location === 'footer') {
        dropdownId = 'languageDropdownFooter';
    } else if (location === 'mobile') {
        dropdownId = 'languageDropdownMobile';
    } else {
        dropdownId = 'languageDropdown';
    }
    
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle('active');
    
    // Close other dropdowns
    const allDropdowns = document.querySelectorAll('.language-dropdown');
    allDropdowns.forEach(d => {
        if (d.id !== dropdownId) {
            d.classList.remove('active');
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const languageSelectors = document.querySelectorAll('.language-selector');
    let clickedInside = false;
    
    languageSelectors.forEach(selector => {
        if (selector.contains(event.target)) {
            clickedInside = true;
        }
    });
    
    if (!clickedInside) {
        document.querySelectorAll('.language-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Change Language Function
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Update active state in language options
    const allOptions = document.querySelectorAll('.language-option');
    allOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    const selectedOptions = document.querySelectorAll(`.language-option[onclick="changeLanguage('${lang}')"]`);
    selectedOptions.forEach(option => {
        option.classList.add('active');
    });
    
    // Close all dropdowns
    document.querySelectorAll('.language-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference on page load
window.addEventListener('load', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        changeLanguage(savedLanguage);
    }
    
    // Initialize typing effect
    const titleElement = document.querySelector('#profile .title');
    if (titleElement) {
        const originalText = titleElement.textContent;
        typeWriter(titleElement, originalText, 100);
    }
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add parallax effect to background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const codeSymbols = document.querySelectorAll('.code-symbol');
    const floatingIcons = document.querySelectorAll('.floating-icon');
   
    codeSymbols.forEach((symbol, index) => {
        const speed = 0.1 + (index * 0.02);
        symbol.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
   
    floatingIcons.forEach((icon, index) => {
        const speed = 0.15 + (index * 0.03);
        icon.style.transform = `translateY(${scrolled * speed}px) scale(${1 + (scrolled * 0.0001)})`;
    });
});

// Typing effect function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
   
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
   
    type();
}

// Add hover effect to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.color-container');
   
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
       
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
       
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
       
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
       
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});