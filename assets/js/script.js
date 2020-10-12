(function(){

    'use script'

    const cards = document.querySelectorAll('.card');
    let hasFlippedCard = false;
    let firstCard;
    let secondCard;
    let lockBoard = false;

    function flipCard(){
        
        if(lockBoard) return;

        if(this === firstCard) return;
        
        this.classList.add('flip')
        if(!hasFlippedCard){
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        //PARA RESETAR AS CARTAS
        hasFlippedCard = false;
        checkForMatch();
    }

    function checkForMatch(){
        if (firstCard.dataset.card === secondCard.dataset.card){
            disableCards();
            return; 
        }
        unflipCards()
    }

    function disableCards(){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard()
    }

    function unflipCards(){
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
            resetBoard()
        }, 1500)
    }

    //DAR UMA LIMPADA ONDE ESTA SENDO USADA ESTAS VARIAVEIS
    function resetBoard(){
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null]
    }

    //ENCAPSULANDO ELE EM PARENTESES E COLOCANDO UM PARENTESES NO FINAL A FUNCAO SERA INVOCADA PRIMEIRO
    (function shuffle(){
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 12)
            card.style.order = randomPosition
        }) 
    })();

    cards.forEach( (card) =>{
        card.addEventListener('click', flipCard);
    })


})()