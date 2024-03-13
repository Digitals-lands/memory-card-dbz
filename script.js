var nomsFichiers = [
    'frieza.png',
    'android-16.png',
    'buu.png',
    'android-17.png',
    'goku.png',
    'android-18.png',
    'cell.png',
    'chiaotzu.png',
    'gohan.png',
    'petit-gohan.png',
    'trunks.png',
    'vegeta.png',
    'vegeta-ss.png',
    'krilin.png',
    'nappa.png',
    'piccolo.png',
    'tien.png',
    'vegito.png',
    'yamcha.png',
  ]
  var score=0
  const cardArray = [];
  for (var i = 0; i < 6; i++) {
    // Générer un index aléatoire entre 0 et la longueur du tableau des noms de fichiers
    var indexAleatoire = Math.floor(Math.random() * nomsFichiers.length);
    
    // Ajouter le nom du fichier correspondant à l'index aléatoire au tableau des fichiers choisis
    cardArray.push(nomsFichiers[indexAleatoire]);
    
    // Ajouter à nouveau le nom du fichier sélectionné au tableau des fichiers choisis pour le dupliquer
    cardArray.push(nomsFichiers[indexAleatoire]);
    
    // Supprimer le nom du fichier sélectionné pour éviter les duplications
    nomsFichiers.splice(indexAleatoire, 1);
  }
  cardArray.sort(() => 0.5 - Math.random());
  
  const grid = document.querySelector('.grid');
  const cardsChosen = [];
  const cardsChosenId = [];
  const cardsWon = [];
  
  
  
  function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
  
    if (cardsChosen[0] === cardsChosen[1] && cardsChosenId[0] != cardsChosenId[1]) {
  
      cardsWon.push(cardsChosen[0]);
      perso_attack = cardsChosen[0].split('.');
      perso_attack = 'video/perso/' + perso_attack[0] + '.mp4'
  
      document.getElementById('source_attack').src=perso_attack
  
      document.getElementById('attack-container').style.display = 'block'
      document.getElementById('memory-game').style.display = 'none';
      video = document.getElementById("background-attack");
      video.load();
      video.addEventListener('loadedmetadata', function() {
        // Lancer la vidéo une fois que les métadonnées sont chargées
        video.play();
      });
  
    } else {
      cards[optionOneId].style.backgroundImage = `url(img/carte.jpg)`;
      cards[optionTwoId].style.backgroundImage = `url(img/carte.jpg)`;
      score=score+1
      document.getElementById("score").innerText=score
    }
  
  
    if (cardsWon.length === cardArray.length / 2) {
      perso_attack = cardsChosen[0].split('.');
      perso_attack = 'video/perso/' + perso_attack[0] + '.mp4'
  
      document.getElementById('source_attack').src=perso_attack
  
      document.getElementById('attack-container').style.display = 'block'
      document.getElementById('memory-game').style.display = 'none';
      video = document.getElementById("background-attack");
      video.load();
      video.addEventListener('loadedmetadata', function() {
        // Lancer la vidéo une fois que les métadonnées sont chargées
        video.play();
      });
      alert('Félicitations, vous avez gagné !');
      
    }
    
    cardsChosen.length = 0;
    cardsChosenId.length = 0;
  }
  
  function flipCard() {
    const cardId = this.getAttribute('data-id');
  
    this.style.backgroundImage = `url(img/carte/${cardArray[cardId]})`;
  
    cardsChosen.push(cardArray[cardId]);
    cardsChosenId.push(cardId);
    if (cardsChosen.length === 2 && cardsChosenId[0] != cardsChosenId[1]) {
      setTimeout(checkForMatch, 1000);
    }
    else if (cardsChosen.length === 2 && cardsChosenId[0] == cardsChosenId[1]) {
  
      cardsChosen.length = 1
      cardsChosenId.length = 1
  
    }
  }

  document.getElementById("score").innerText=score
  
  
  const video_cinematique = document.getElementById('background-video');
  
  video_cinematique.addEventListener('ended', function () {
    document.getElementById('video-container').style.display = 'none';
    document.getElementById('image-container').style.display = 'block';
  });
  
  const video_attack = document.getElementById('background-attack');
  
  video_attack.addEventListener('ended', function () {
    document.getElementById('attack-container').style.display = 'none';
    document.getElementById('memory-game').style.display = 'flex';
  });
  
  
  
  function createBoard() {
  
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  }
  
  
  
  function skipVideo() {
  
  
    if (document.getElementById('video-container').style.display == 'block') {
  
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'block';
      document.getElementById('memory-game').style.display = 'none';
      document.getElementById('attack-container').style.display = 'none'
  
    }
    else if (document.getElementById('image-container').style.display == 'block') {
  
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'none';
      document.getElementById('memory-game').style.display = 'flex';
      document.getElementById('attack-container').style.display = 'none'
      createBoard()
    }
    else if (document.getElementById('attack-container').style.display == 'block') {
  
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'none';
      document.getElementById('memory-game').style.display = 'flex';
      document.getElementById('attack-container').style.display = 'none'
  
    }
    else{
      
      grid.innerHTML = null;
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('image-container').style.display = 'block';
      document.getElementById('memory-game').style.display = 'none';
      document.getElementById('attack-container').style.display = 'none'
  
    }
  }