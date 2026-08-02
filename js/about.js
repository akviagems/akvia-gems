/*==================================================
BENGALURU GEMS
about.js
Version 1
==================================================*/



document.addEventListener(

    "DOMContentLoaded",

    function(){

        animateCounters();

        revealElements();

    }

);



/*==========================
Counter Animation
==========================*/

function animateCounters(){


    const counters =

    document.querySelectorAll(

        ".stats-section h2"

    );



    counters.forEach(counter=>{


        const text =

        counter.textContent;



        const number =

        parseInt(text);



        if(isNaN(number)){

            return;

        }



        let current = 0;



        const speed =

        Math.max(

            20,

            Math.floor(number/50)

        );



        const interval =

        setInterval(function(){


            current += speed;



            if(current >= number){

                counter.textContent = text;

                clearInterval(interval);

            }

            else{

                if(text.includes("%")){

                    counter.textContent =

                    current + "%";

                }

                else{

                    counter.textContent =

                    current + "+";

                }

            }


        },30);



    });



}



/*==========================
Reveal Animation
==========================*/

function revealElements(){


    const elements =

    document.querySelectorAll(

        ".mission-card,.feature-box,.team-card,.testimonial-card"

    );



    elements.forEach(function(item,index){


        item.style.opacity="0";

        item.style.transform="translateY(40px)";



        setTimeout(function(){

            item.style.transition=

            "all .6s ease";

            item.style.opacity="1";

            item.style.transform=

            "translateY(0)";

        },index*150);



    });



}