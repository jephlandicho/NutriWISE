
<!-- Vendor JS Files -->
<script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/chart.js/chart.umd.js"></script>
<script src="assets/vendor/echarts/echarts.min.js"></script>
<script src="assets/vendor/quill/quill.min.js"></script>
<script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="assets/vendor/tinymce/tinymce.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="assets/js/main.js"></script>

<script>
  $(function () {
    // Activate Bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();
  });
</script>
<script>
  $(document).ready(function () {
    // Activate Bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();
  });

  function insertLink(type) {
    if (type === 'google-drive') {
      $('#drive-link-input-group').show();
      $('#youtube-link-input-group').hide();
      $('#regular-link-input-group').hide();
    } else if (type === 'youtube') {
      $('#drive-link-input-group').hide();
      $('#youtube-link-input-group').show();
      $('#regular-link-input-group').hide();
    } else if (type === 'link') {
      $('#drive-link-input-group').hide();
      $('#youtube-link-input-group').hide();
      $('#regular-link-input-group').show();
    }
  }

  function uploadFile() {
    $('#regular-link-input-group').hide();
    $('#file-input-group').show();
  }
</script>
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/chart.js/chart.umd.js"></script>
<script src="assets/vendor/echarts/echarts.min.js"></script>
<script src="assets/vendor/quill/quill.min.js"></script>
<script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="assets/vendor/tinymce/tinymce.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="assets/js/main.js"></script>




</body>

</html>
