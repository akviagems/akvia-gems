/*==================================================
BENGALURU GEMS
contact.js
Version 1
==================================================*/



document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeContactForm();

    }

);



/*==========================
Initialize Contact Form
==========================*/

function initializeContactForm(){


    const form =

    document.getElementById(

        "contactForm"

    );



    if(!form){

        return;

    }



    form.addEventListener(

        "submit",

        submitContactForm

    );

}



/*==========================
Submit Contact Form
==========================*/

function submitContactForm(event){


    event.preventDefault();



    const name =

    document.getElementById(

        "name"

    ).value.trim();



    const email =

    document.getElementById(

        "email"

    ).value.trim();



    const phone =

    document.getElementById(

        "phone"

    ).value.trim();



    const subject =

    document.getElementById(

        "subject"

    ).value.trim();



    const message =

    document.getElementById(

        "message"

    ).value.trim();



    if(

        name==="" ||

        email==="" ||

        phone==="" ||

        subject==="" ||

        message===""

    ){

        alert(

            "Please fill in all fields."

        );

        return;

    }



    if(

        !validateEmail(email)

    ){

        alert(

            "Please enter a valid email address."

        );

        return;

    }



    sendWhatsAppMessage(

        name,

        email,

        phone,

        subject,

        message

    );

}
/*==========================
Validate Email
==========================*/

function validateEmail(email){


    const pattern =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return pattern.test(

        email

    );

}



/*==========================
Send WhatsApp Message
==========================*/

function sendWhatsAppMessage(

    name,

    email,

    phone,

    subject,

    message

){


    const whatsappNumber =

    "919876543210";



    const text =

`*New Enquiry - Bengaluru Gems*

Name: ${name}

Email: ${email}

Phone: ${phone}

Subject: ${subject}

Message:
${message}`;



    const url =

    "https://wa.me/" +

    whatsappNumber +

    "?text=" +

    encodeURIComponent(text);



    window.open(

        url,

        "_blank"

    );



    document.getElementById(

        "contactForm"

    ).reset();



    alert(

        "Your enquiry has been prepared. Please send it in WhatsApp."

    );

}
/*==========================
Reveal Animation
==========================*/

window.addEventListener(

    "load",

    function(){

        revealSections();

    }

);



function revealSections(){


    const items =

    document.querySelectorAll(

        ".contact-card,.contact-form,.map-box,.accordion-item,.social-icons a"

    );



    items.forEach(function(item,index){


        item.style.opacity="0";

        item.style.transform="translateY(30px)";



        setTimeout(function(){


            item.style.transition=

            "all .6s ease";



            item.style.opacity="1";



            item.style.transform=

            "translateY(0)";


        },index*120);



    });



}



/*==========================
Smooth Scroll
==========================*/

document.querySelectorAll(

    'a[href^="#"]'

).forEach(function(link){


    link.addEventListener(

        "click",

        function(event){


            const target =

            document.querySelector(

                this.getAttribute("href")

            );



            if(target){


                event.preventDefault();



                target.scrollIntoView({

                    behavior:"smooth"

                });


            }


        }

    );


});



/*==========================
Future Ready
==========================*/

function showSuccessMessage(message){

    alert(message);

}



function clearContactForm(){

    const form =

    document.getElementById(

        "contactForm"

    );



    if(form){

        form.reset();

    }

}