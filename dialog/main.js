import dialogPolyfill from 'dialog-polyfill'
const dialog = document.querySelector('dialog')

dialogPolyfill.registerDialog(dialog);

(function() {
  var updateButton = document.getElementById('updateDetails');
  var cancelButton = document.getElementById('cancel');
  var favDialog = document.getElementById('favDialog');

  updateButton.addEventListener('click', function() {
    favDialog.showModal();
  });

  cancelButton.addEventListener('click', function() {
    favDialog.close();
  });
})();