<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

     //Send email or store data
    mail("millihub@hotmail.com", "Website Inquiry", $message, "From: $email");
}

?>
