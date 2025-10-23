<script>
  let ticketsLeft = parseInt(localStorage.getItem('ticketsLeft')) || 200;
  let currentTicket = parseInt(localStorage.getItem('currentTicket')) || 102025001;

  document.getElementById("ticketsLeft").innerText = ticketsLeft;

  // When main form is submitted
  document.getElementById("lotteryForm").addEventListener("submit", function(e) {
    e.preventDefault();
    if (ticketsLeft <= 0) {
      alert("Sorry, all tickets are sold out.");
      return;
    }
    document.getElementById("paymentModal").style.display = "flex";
  });

  // When clicking Proceed button in Terms modal
  document.getElementById("proceedPayment").addEventListener("click", function () {
    if (!document.getElementById("acceptTerms").checked) {
      alert("Please accept the terms to proceed.");
      return;
    }

    // Hide Terms & Conditions modal
    document.getElementById("paymentModal").style.display = "none";

    // Show Google Form modal
    document.getElementById("googleFormModal").style.display = "flex";
  });

  // When user confirms they have submitted the Google Form
  document.getElementById("formSubmittedBtn").addEventListener("click", function () {
    // Hide Google Form modal
    document.getElementById("googleFormModal").style.display = "none";

    // Show payment scanner section
    document.getElementById("scannerSection").style.display = "block";

    // Save user data and update tickets
    const form = document.forms["lotteryForm"];
    const user = {
      name: form.name.value,
      mobile: form.mobile.value,
      address: form.address.value,
      email: form.email.value,
      ticket: currentTicket
    };

    localStorage.setItem("lastUser", JSON.stringify(user));
    ticketsLeft--;
    currentTicket++;

    localStorage.setItem("ticketsLeft", ticketsLeft);
    localStorage.setItem("currentTicket", currentTicket);
    document.getElementById("ticketsLeft").innerText = ticketsLeft;

    // Reset the form
    form.reset();
  });

  // Close modals if clicking outside
  window.onclick = function(e) {
    const modal1 = document.getElementById("paymentModal");
    const modal2 = document.getElementById("googleFormModal");
    if (e.target === modal1) modal1.style.display = "none";
    if (e.target === modal2) modal2.style.display = "none";
  };
</script>
