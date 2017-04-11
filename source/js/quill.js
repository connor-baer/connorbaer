/**
 * Submit Quill content to Craft
 */
function quillSubmit() {
  const quillEditor = document.querySelector('#quill-editor').firstChild;
  const quillInput = document.querySelector('input[id=quill]');

  quillInput.value = quillEditor.firstChild.innerHTML;
  console.log(quillEditor.firstChild.innerHTML);
}
