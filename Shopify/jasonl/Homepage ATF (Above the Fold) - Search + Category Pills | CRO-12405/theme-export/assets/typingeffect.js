 window.addEventListener('DOMContentLoaded',function () {
       function typingEffect() {
            const contactTexts = shuffleArray([
                'Launching a startup?',
                'Rolling out nationwide?',
                'WFH or back in the office?',
                'Growing fast or scaling steady?',
                'One site or 100?',
                'New chair or full fitout?',
            ]);

            const typedtext = document.querySelector(".typedtext");
            let removing = false;
            let idx = 0;
            let char = 0;

            const typingSpeed = 40;     // typing speed
            const deletingSpeed = 10;   // deleting speed
            const pauseBeforeDelete = 1000; // pause before deleting

            function typeLoop() {
                if (!removing) {
                if (char < contactTexts[idx].length) {
                    typedtext.innerHTML += contactTexts[idx][char];
                    char++;
                    setTimeout(typeLoop, typingSpeed);
                } else {
                    setTimeout(() => {
                    removing = true;
                    typeLoop();
                    }, pauseBeforeDelete);
                }
                } else {
                if (typedtext.innerHTML.length > 0) {
                    typedtext.innerHTML = typedtext.innerHTML.slice(0, -1);
                    setTimeout(typeLoop, deletingSpeed);
                } else {
                    removing = false;
                    char = 0;
                    idx = (idx + 1) % contactTexts.length;
                    setTimeout(typeLoop, typingSpeed);
                }
                }
            }

            typeLoop();
            }

            function shuffleArray(array) {
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
            }

            typingEffect();
    });