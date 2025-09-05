<?php
header('Content-Type: application/json');

// 1. Validate reCAPTCHA v3
$recaptcha_secret = '6LeC6JwrAAAAALOQjOAO3bHimKr7Rd9T-87tMu6a';
$recaptcha_response = $_POST['g-recaptcha-response'] ?? '';
if (!$recaptcha_response) {
    http_response_code(400);
    echo json_encode(['status'=>'error', 'message'=>'reCAPTCHA verification failed.']);
    exit;
}
$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptcha_secret&response=$recaptcha_response");
$captcha_success = json_decode($verify, true);

// reCAPTCHA v3: check success and score (e.g. >= 0.5)
if (!$captcha_success['success'] || $captcha_success['score'] < 0.5) {
    http_response_code(400);
    echo json_encode(['status'=>'error', 'message'=>'reCAPTCHA failed or suspicious activity.']);
    exit;
}

// 2. Get fields and basic validation
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if(strlen($name) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(['status'=>'error', 'message'=>'Invalid input.']);
    exit;
}

// 3. PHPMailer setup
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contact@snowkingdomphuket.com';
    $mail->Password = 'Snow@000';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Best practice: Sender must be from your domain!
    $mail->setFrom('contact@snowkingdomphuket.com', $name); // FROM your domain, but show user's name
    $mail->addReplyTo($email, $name); // Reply-To is user

    $mail->addAddress('contact@snowkingdomphuket.com'); // Or whatever inbox you want to receive to

    $mail->isHTML(true);
    $mail->Subject = 'Contact Form Message';
    $mail->Body = "<b>Name:</b> " . htmlspecialchars($name) . "<br>
                   <b>Email:</b> " . htmlspecialchars($email) . "<br>
                   <b>Message:</b><br>" . nl2br(htmlspecialchars($message));

    $mail->send();
    echo json_encode(['status'=>'success', 'message'=>'Message sent!']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status'=>'error', 'message'=>'Mailer Error: '.$mail->ErrorInfo]);
}
?>
