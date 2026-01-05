// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      }
    });
    
    // Close sidebar when clicking on a nav item
    const navItems = sidebar.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        sidebar.classList.remove('active');
      });
    });
  }
});
