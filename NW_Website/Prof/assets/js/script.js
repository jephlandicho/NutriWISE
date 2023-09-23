/*
classes
*/

document.addEventListener('DOMContentLoaded', function() {
  // Get the modal and button elements
  const modal = document.getElementById('addClassModal');
  const addClassBtn = document.getElementById('add-class-btn');
  const closeBtn = document.getElementsByClassName('close')[0];
  const classContainer = document.querySelector('.class-container'); // Get the class container element
  const addScheduleBtn = document.querySelector('.add-schedule');
  const scheduleEntries = document.getElementById('scheduleEntries');

  addScheduleBtn.addEventListener('click', function() {
    const newScheduleEntry = document.querySelector('.schedule-entry').cloneNode(true);
    newScheduleEntry.querySelector('.schedule-day').value = ''; // Reset select value
    newScheduleEntry.querySelector('.start-time').value = ''; // Reset input value
    newScheduleEntry.querySelector('.end-time').value = ''; // Reset input value
    scheduleEntries.appendChild(newScheduleEntry);
  });

  // Remove schedule entry
  scheduleEntries.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-schedule')) {
      event.target.parentElement.remove();
    }
  });

  // Function to fetch and update the class list
  function updateClassList() {
    // Make an AJAX request to fetch the updated class data
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_classes.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Handle the response from the server
          const response = xhr.responseText;
          // Update the class container with the new class data
          classContainer.innerHTML = response;
        } else {
          // Request failed, display a general error message or perform any other necessary action
          console.log('An error occurred while fetching the class list.');
        }
      }
    };
    xhr.send();
  }

  // Add event listener to the button
  addClassBtn.addEventListener('click', function() {
    // Show the modal
    modal.style.display = 'block';
  });

  // Close the modal when the close button is clicked
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Close the modal when the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

// Function to show Sweet Alert
function showSweetAlert(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton: true,
    confirmButtonText: "Done",
    timer: 5000,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Refresh the page automatically after the Sweet Alert is confirmed
      location.reload();
    }
  });
}

  // Save the class when the save button is clicked
  document.getElementById('saveClassBtn').addEventListener('click', function(event) {
    event.preventDefault();

    // Retrieve form data
    const className = document.getElementById('classNameInput').value.trim();
    const description = document.getElementById('descriptionInput').value.trim();

    // Gather schedule entry data
    const scheduleEntries = document.querySelectorAll('.schedule-entry');
    const scheduleDays = [];
    const startTimes = [];
    const endTimes = [];

    scheduleEntries.forEach(entry => {
      const scheduleDay = entry.querySelector('.schedule-day').value;
      const startTime = entry.querySelector('.start-time').value;
      const endTime = entry.querySelector('.end-time').value;

      scheduleDays.push(scheduleDay);
      startTimes.push(startTime);
      endTimes.push(endTime);
    });

    // Create an AJAX request to save the class data
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_class.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Handle the response from the server
          const response = xhr.responseText;
          if (response === 'success') {
            // Class saved successfully
            // Close the modal
            modal.style.display = 'none';

            // Reset the form fields
            document.getElementById('classNameInput').value = '';
            document.getElementById('descriptionInput').value = '';

            // Clear schedule entries
            scheduleEntries.forEach(entry => {
              entry.remove();
            });

            // Display Sweet Alert success message with the "Done" button
            showSweetAlert(
              "Class Added Successfully!",
              "Your new class has been added.",
              "success"
            );

            // Update the class list
            updateClassList();
          } else {
            // Failed to save class, display the error message or perform any other necessary action
            showSweetAlert("Failed to Save Class", "An error occurred while saving the class.", "error");
          }
        } else {
          // Request failed, display a general error message or perform any other necessary action
          showSweetAlert("Error", "An error occurred. Please try again later.", "error");
        }
      }
    };

    // Send the class data to the server for saving
    xhr.send('class_name=' + encodeURIComponent(className) + '&description=' + encodeURIComponent(description) +
      '&schedule_days=' + encodeURIComponent(JSON.stringify(scheduleDays)) +
      '&start_times=' + encodeURIComponent(JSON.stringify(startTimes)) +
      '&end_times=' + encodeURIComponent(JSON.stringify(endTimes)));
  });

  // Initial fetch and update of class list on page load
  updateClassList();
});
