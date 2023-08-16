<?php
function getFileIconClass($extension)
{
    $iconClass = 'file-icon'; // Default file icon class

    // Define additional file icons based on the file extension
    switch ($extension) {
        case 'pdf':
            $iconClass = 'file-icon-pdf';
            break;
        // ... Add other cases for different file extensions ...
    }

    return $iconClass;
}

function getAbsoluteUploadedFilePath($fileName)
{
    // Replace this with the actual URL to your uploaded files folder on your server
    $baseUrl = 'C:\xampp\htdocs\NutriWISE\NW_Website\Prof\uploadedfiles';

    return $baseUrl . $fileName;
}
?>
