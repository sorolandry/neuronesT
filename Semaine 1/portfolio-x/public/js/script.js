
     const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navBarre-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    
    // Afficher ou cacher le bouton selon le scroll
    window.onscroll = function() {
        const bouton = document.getElementById("bouton-retour");
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            bouton.style.display = "block";
        } else {
            bouton.style.display = "none";
        }
    };

    // Remonter en haut quand on clique sur le bouton
    document.getElementById("bouton-retour").addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    const menuToggle = document.getElementById('menu-toggle');
    const headerNav = document.getElementById('header-nav');

    menuToggle.addEventListener('click', () => {
        headerNav.classList.toggle('open');
    });

