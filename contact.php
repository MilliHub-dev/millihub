<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitize and validate inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

  
    }

    // Check for valid email
   if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       // echo "<script>alert('Invalid email format.'); window.history.back();</script>";
       // exit;
//    }

    // Email details
    $to = "info.millihub@gmail.com"; // Replace with your email
   // $subject = "New Contact Form Submission";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Message body
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message\n";

    // Send the email
    if (mail($to, $subject, $email_body, $headers)) {
       echo "<script>alert('Message sent successfully!'); window.location.href = '/millihub/index.html';</script>";
   } else {
        echo "<script>alert('Failed to send the message. Please try again later.'); window.history.back();</script>";
    }
 } else {
    echo "<script>alert('Invalid request method.'); window.history.back();</script>";
}
?>