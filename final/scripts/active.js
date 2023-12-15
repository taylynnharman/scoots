document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll('.navigation a').forEach(link => {
        link.classList.remove('active');
    });
    
    const currentLink = document.querySelector(`.navigation a[href="${currentPage}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
});