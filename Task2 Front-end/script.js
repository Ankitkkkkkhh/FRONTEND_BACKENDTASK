const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;

    // Close others
    faqQuestions.forEach((item) => {
      if (item !== btn) {
        item.classList.remove('active');
        item.nextElementSibling.classList.remove('open');
      }
    });

    // Toggle current
    btn.classList.toggle('active');
    answer.classList.toggle('open');
  });
});
