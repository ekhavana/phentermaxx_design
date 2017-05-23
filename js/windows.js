// JavaScript Document

var captcha_request_a_call;
var captcha_questions;
var captcha_login;
var captcha_recovery_password;

var verifyCallback = function(response) {
    alert(response);
};

//bitrix_phenter.ru
var sitekey = "6LdWMCgTAAAAAMNfxKvGr5QT7xWNgsBKdedX8OKV";

var onloadCallback = function(){
    captcha_request_a_call = grecaptcha.render('captcha_container_request_a_call', {'sitekey' : sitekey, 'size': 'normal'});
    captcha_questions = grecaptcha.render('captcha_container_questions', {'sitekey' : sitekey});
    captcha_login = grecaptcha.render('captcha_container_login', {'sitekey' : sitekey});
    captcha_recovery_password = grecaptcha.render('captcha_container_recovery_password', {'sitekey' : sitekey});
};

//Показ модального акна с сообщением
function show_message(header, message, type = "OK")
{
    $('#alert').find('.header').removeClass('ERROR').removeClass('OK').addClass(type).empty().text(header);
    $('#alert').find('.alert_message').empty().text(message);
    $('#alert').modal();
    if(type == 'OK'){
        setTimeout(function(){
            $("#alert").modal('hide');
        }, 5000);
    }

}

jQuery(document).ready(function($){

    $('[data-toggle="tooltip"]').tooltip();

    //Работаем с формой смены пароля
    $(".modal#password_recovery .modal_window_button").click(function(){
        $(this).addClass("load");

        request = new Object();
        parent = $(this).parent();
        request.email = $(parent).find('input[name=EMAIL]').val();

        FORM_SERIALIZE = $("form#password_recovery").serialize();
        FORM_ARRAY = FORM_SERIALIZE.split("&");

        $.each(FORM_ARRAY, function(key, value){
            TEMP = value.split("=");
            if(TEMP[0] == "g-recaptcha-response"){
                request.CAPTCHA = TEMP[1];
            }
        })

        json = JSON.stringify(request);

        $.post('/ajax.php', {action:'password_recovery', data:json}, function(data){

            ANSWER = JSON.parse(data);

            if(ANSWER.TYPE == "ERROR"){
                grecaptcha.reset(captcha_recovery_password);
                $(parent).find('input[name=EMAIL]').val('');
                $(".modal#password_recovery .modal_window_button").removeClass("load");
                $(".modal#password_recovery .modal_window_status").addClass(ANSWER.TYPE).text(ANSWER.MESSAGE);
            }

            if(ANSWER.TYPE == "OK")
            {
                $(".modal#password_recovery .modal_window_status").addClass(ANSWER.TYPE).text("Success! A new password has been sent to your email");
                $(".modal#password_recovery .modal_window_button").removeClass("load");
                setTimeout(function(){
                    $(".modal#password_recovery").modal('hide');
                }, 5000);
            }
        })
    });

    //Работаем с формой авторизации

    $(".modal#login .modal_window_button").click(function(){

        $(this).addClass("load");

        request = new Object();
        parent = $(this).parent();
        request.login = $(parent).find('input[name=LOGIN]').val();
        request.password = $(parent).find('input[name=PASSWORD]').val();

        FORM_SERIALIZE = $("form#login_form").serialize();
        FORM_ARRAY = FORM_SERIALIZE.split("&");

        $.each(FORM_ARRAY, function(key, value){
            TEMP = value.split("=");
            if(TEMP[0] == "g-recaptcha-response"){
                request.CAPTCHA = TEMP[1];
            }
        })

        json = JSON.stringify(request);

        $.post('/ajax.php', {action:'login', data:json}, function(data){
            ANSWER = JSON.parse(data);

            if(ANSWER.TYPE == "ERROR"){
                grecaptcha.reset(captcha_login);
                $(".modal#login .modal_window_button").removeClass("load");
                $(".modal#login .modal_window_status").addClass(ANSWER.TYPE).text(ANSWER.MESSAGE);
            }

            if(ANSWER.TYPE == "OK")
            {
                $(".modal#login .modal_window_status").addClass(ANSWER.TYPE).text("Success! Reloading the page...");
                $(".modal#login .modal_window_button").removeClass("load");
                setTimeout(function(){
                    location = '/personal/';
                }, 1000);
            }
        })

    })


    $("#login #forgot_password_link").click(function(){
        $('#login').modal('hide');
        $('#login').on('hidden.bs.modal', function (e) {
            $('#password_recovery').modal();
        })
    })

    $('.modal').on('hidden.bs.modal', function(e){
        $(".modal .modal_window_status").empty().removeClass("OK").removeClass("ERROR");
        $(".modal input").val("").blur();
        grecaptcha.reset(captcha_request_a_call);
        grecaptcha.reset(captcha_login);
        grecaptcha.reset(captcha_recovery_password);
    })


    $(".modal#request_a_call .modal_window_button").click(function(){

        $(this).addClass("load");

        //Собираем поля формы
        REQUEST = new Object();
        REQUEST.NAME = $(".modal#request_a_call input[name=NAME]").val();
        REQUEST.PHONE = $(".modal#request_a_call input[name=PHONE]").val();
        REQUEST.SUBJECT = $(".modal#request_a_call input[name=SUBJECT]").val();

        FORM_SERIALIZE = $("form#request_a_call_form").serialize();
        FORM_ARRAY = FORM_SERIALIZE.split("&");

        $.each(FORM_ARRAY, function(key, value){
            TEMP = value.split("=");
            if(TEMP[0] == "g-recaptcha-response"){
                REQUEST.CAPTCHA = TEMP[1];
            }
        })

        JSON_STRING = JSON.stringify(REQUEST);

        $.post("/ajax.php", {action:"request_a_call", data:JSON_STRING},
        function(data){
            ANSWER = JSON.parse(data);

            if(ANSWER.TYPE == "ERROR"){
                grecaptcha.reset(captcha_request_a_call);
                $(".modal#request_a_call .modal_window_button").removeClass("load");
                $(".modal#request_a_call .modal_window_status").addClass(ANSWER.TYPE).text(ANSWER.MESSAGE);
            }

            if(ANSWER.TYPE == "OK")
            {
                $(".modal#request_a_call .modal_window_status").addClass(ANSWER.TYPE).text("Thank you! Your request has been sent. You will be contacted soon");
                $(".modal#request_a_call .modal_window_button").removeClass("load");
                setTimeout(function(){
                    $(".modal#request_a_call").modal('hide');
                }, 1000);
            }
        })
    })

    $("#request_a_call_form #subject .dropdown-menu li").find('a').click(function(){
        value = $(this).text();
        $("#request_a_call_form").find('input[name=SUBJECT]').val(value);
        $("#request_a_call_form").find('button .text').text(value);
    })


    /*Работаем с формой внизу*/

    $("#footer_banner_content .form #footer_form .dropdown-menu li").find('a').click(function(){
        value = $(this).text();
        $("#footer_banner_content .form #footer_form").find('input[name=SUBJECT]').val(value);
        $("#footer_banner_content .form #footer_form").find('button .text').text(value);
    })


    $("#footer_banner_content .form #footer_form .submit").click(function(){

        $(this).addClass("load");

        //Собираем поля формы
        QUESTION = new Object();
        QUESTION.NAME = $("#footer_banner_content .form #footer_form input[name=NAME]").val();
        QUESTION.PHONE = $("#footer_banner_content .form #footer_form input[name=PHONE]").val();
        QUESTION.EMAIL = $("#footer_banner_content .form #footer_form input[name=EMAIL]").val();
        QUESTION.SUBJECT = $("#footer_banner_content .form #footer_form input[name=SUBJECT]").val();
        QUESTION.COMMENT = $("#footer_banner_content .form #footer_form textarea[name=COMMENT]").val();

        FORM_SERIALIZE = $("#footer_banner_content .form form").serialize();
        FORM_ARRAY = FORM_SERIALIZE.split("&");

        $.each(FORM_ARRAY, function(key, value){
            TEMP = value.split("=");
            if(TEMP[0] == "g-recaptcha-response"){
                QUESTION.CAPTCHA = TEMP[1];
            }
        })

        JSON_STRING = JSON.stringify(QUESTION);


        $.post("/ajax.php", {action:"question", data:JSON_STRING},
        function(data){

            ANSWER = JSON.parse(data);

            if(ANSWER.TYPE == "ERROR"){
                grecaptcha.reset(captcha_questions);
                show_message('ERROR', ANSWER.MESSAGE, ANSWER.TYPE);
            }

            if(ANSWER.TYPE == "OK")
            {
                $("#footer_banner_content .form #footer_form input, #footer_banner_content .form #footer_form textarea").val("");
                grecaptcha.reset(captcha_questions);
                show_message('Thank you!', 'Your request has been sent. You will be contacted soon', 'OK');


            }

            $("#footer_banner_content .form #footer_form .submit").removeClass("load");
        })

    })

})