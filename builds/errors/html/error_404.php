<?php
defined('BASEPATH') || exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap">
    <title>404 Page Not Found</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      
      html,
      body {
        font-family: 'Poppins', sans-serif;
      }
      
      body {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .error-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 600px;
        background: url(/builds/client/assets/images/error_bg.png) no-repeat center/cover;
      }
      
      .error-container::after {
        content: '';
        display: block;
        padding-bottom: 100%;
      }
      
      .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;
        font-size: 22px;
        font-weight: 700;
        line-height: 1;
        color: #ffffff;
      }
      
      .error-status {
        position: relative;
        display: inline-block;
        font-size: 128px;
        font-weight: 900;
        line-height: 1;
      }

      .error-status::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background-color: #d9dd00;
        z-index: -1;
      }
      
      .error-msg {
        margin-top: 26px;
      }
      
      .error-btn {
        display: inline-block;
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5;
        color: #ffffff;
        padding: 0.5em 1em;
        border: 1px solid #fff;
        border-radius: 4px;
        text-decoration: none;
        margin-top: 40px;
      }
    </style>
  </head>
  <body>
    <div class="error-container">
      <div class="error">
        <span class="error-status"><?php echo str_replace(' Page Not Found', '', $heading) ?></span>
        <div class="error-msg">
          <?php echo $message ?>
        </div>
        <a href="javascript:history.back()" class="error-btn">Go Back</a>
      </div>
    </div>
  </body>
</html>