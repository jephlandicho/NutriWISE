<?php include 'header.php' ?>
<main class="main-content">
    <div class="content">
        <div class="container">
            <h2 class="entry-title">Thank you for your interest in NutriWise!</h2>
            <p>If you have any questions about our meal plans, nutrition services, or general inquiries, please don't hesitate to reach out to us. We are committed to providing exceptional customer service and will respond to your message as soon as possible.</p>
            <p>To contact us, you can fill out the contact form below or reach us directly via email or phone. We look forward to hearing from you and assisting you on your journey towards better health and nutrition.</p>

            <div class="contact-details">
                <div class="contact-detail">
                    <span class="icon"><img src="images/icon-map-marker-alt.png" alt="Location"></span>
                    <span class="info">123 Main Street, City, Country</span>
                </div>
                <div class="contact-detail">
                    <span class="icon"><img src="images/icon-envelope.png" alt="Email"></span>
                    <span class="info"><a href="mailto:info@nutriwise.com">info@nutriwise.com</a></span>
                </div>
                <div class="contact-detail">
                    <span class="icon"><img src="images/icon-phone.png" alt="Phone"></span>
                    <span class="info"><a href="tel:+11234567890">+1 123 456 7890</a></span>
                </div>
            </div>

            <div class="map"></div>

            <div class="contact-form">
                <div class="row">
                    <div class="col-md-5">
                        <input type="text" placeholder="Your name...">
                        <input type="text" placeholder="Email...">
                        <input type="text" placeholder="Website...">
                    </div>
                    <div class="col-md-7">
                        <textarea placeholder="Message..."></textarea>
                        <input type="submit" value="Send message">
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php include 'footer.php'?>

<script src="js/jquery-1.11.1.min.js"></script>
<script src="http://maps.google.com/maps/api/js?sensor=false&amp;language=en"></script>
<script src="js/plugins.js"></script>
<script src="js/app.js"></script>
</body>
</html>
