document.getElementById('uploadBtn').addEventListener('click', function () {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function () {
  const file = this.files[0];
  const uploadedImage = document.getElementById('uploadedImage');
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});