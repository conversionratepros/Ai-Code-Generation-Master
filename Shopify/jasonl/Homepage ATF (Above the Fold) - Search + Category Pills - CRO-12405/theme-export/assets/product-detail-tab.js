 // JavaScript to handle tab switching
 const tabs = document.querySelectorAll('.tab-link');
 const contents = document.querySelectorAll('.tab-content');

 tabs.forEach(tab => {
     tab.addEventListener('click', () => {
         // Remove 'active' class from all tabs and contents
         tabs.forEach(item => item.classList.remove('active'));
         contents.forEach(content => content.classList.remove('active'));

         // Add 'active' class to the clicked tab and corresponding content
         tab.classList.add('active');
         const tabContent = document.getElementById(tab.getAttribute('data-tab'));
         tabContent.classList.add('active');
     });
 });