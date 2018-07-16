var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector('#shared-moments');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

function listEmployees(employeesList) {
  var employeesListHtml = '';
  var rowClass = '';
  //console.log ("employeesList:", employeesList.data);
  for (employeeIndex in employeesList.data) {
    rowClass = employeeIndex % 2 == 0 ? 'emp-content-even' : 'emp-content-odd';
    employeesListHtml += '<div class="emp-content ' + rowClass + '"><p>' + employeesList.data[employeeIndex].Name + ' - ' + employeesList.data[employeeIndex].Dept + '</p></div>'
  }
  document.getElementById('emp-box').innerHTML = employeesListHtml;
}

fetch('/api/employees.json')
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    listEmployees(data);
});