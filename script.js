// script.js

let totalTickets = 200;
let currentTicketNumber = 102025001;

document.getElementById('lotteryForm').addEventListener('submit', function (e) {
  e.preventDefault();

  if (totalTickets <= 0) {
    alert("Sorry, all tickets are sold out!");
    return;
  }

  // Show terms modal
  document.getElementById('paymentModal').style.display = 'flex';
});

document.getElementById('proceedPayment').addEventListener('click', function () {
  const termsAccepted = document.getElementById('acceptTerms').checked;
  if (!termsAccepted) {
    alert("Please accept the terms and conditions.");
    return;
  }

  document.getElementById('paymentModal').style.display = 'none';
  document.getElementById('scannerSection').style.display = 'block';

  // Send to Google Sheets
  submitToGoogleSheets();

  // Update ticket count
  totalTickets--;
  document.getElementById('ticketsLeft').innerText = totalTickets;

  // Store for PDF
  localStorage.setItem('ticketNumber', currentTicketNumber);
  currentTicketNumber++;
});

document.getElementById('downloadTicket').addEventListener('click', function () {
  const ticketNum = localStorage.getItem('ticketNumber') || "XXXXXX";

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Lott India Lottery Ticket", 20, 30);
  doc.setFontSize(14);
  doc.text("Thank you for your purchase!", 20, 50);
  doc.text("Your Ticket Number:", 20, 70);
  doc.text(ticketNum, 20, 80);
  doc.text("Prize: Shih Tzu Puppy 🐶", 20, 100);
  doc.save(`LottIndia_Ticket_${ticketNum}.pdf`);
});

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById('paymentModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// GOOGLE SHEETS SUBMIT
function submitToGoogleSheets() {
  const form = document.forms['lotteryForm'];
  const data = {
    name: form.name.value,
    mobile: form.mobile.value,
    address: form.address.value,
    email: form.email.value,
    ticketNumber: currentTicketNumber
  };

  fetch("https://script.google.com/macros/s/AKfycbx7TgfjpujQvG1BsWzl_X2EVriFbz70qgn87xLKNmVz_km6uvQcHznS9chkrX6TZsjagA/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  form.reset();
}
