<!DOCTYPE html>
<html lang="en">
  <head>
    
      <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      
    <title>Phentermaxx</title>
      
      <?php wp_head(); ?>
     
      <!-- Bootstrap and other CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
      <link rel="icon" href="/favicon.ico" type="image/x-icon">
     
      //Google Analytics
      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-99629862-1', 'auto');
        ga('send', 'pageview');
        ga('set', 'userId', {{USER_ID}}); // Set the user ID using signed-in user_id.
      </script>
      
  </head>

  <?php

    if( is_front_page() ):
      $phentermax_classes = array('phentermax-class', 'my-class');
    else:
      $phentermax_classes = array( 'no-phentermax-class');
    endif;

   ?>

  <body <?php body_class( $phentermax_classes ); ?>>

      <?php wp_nav_menu(array('theme_location'=>'primary')); ?>
      
      <img src="<?php header_image(); ?>" height="<?php echo get_custom_header()->height; ?>" width="<?php echo get_custom_header()->width; ?>" alt="" />
