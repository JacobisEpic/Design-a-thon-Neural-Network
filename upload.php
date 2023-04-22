<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $file = $_FILES['fileToUpload'];

    if ($file['error'] == UPLOAD_ERR_OK) {
        $uploadDir = '/Users/jacobc/Documents/Design-a-thon-Neural-Network/Uploads';
        $uploadFile = $uploadDir . basename($file['name']);

        if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
            echo 'File uploaded successfully.';
        } else {
            echo 'Error uploading file.';
        }
    } else {
        echo 'Error: ' . $file['error'];
    }
}
?>
