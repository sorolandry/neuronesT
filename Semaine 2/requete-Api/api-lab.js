// --- PARTIE 1 : Requêtes API avec Fetch ---

const loadPostsBtn = document.getElementById('load-posts-btn');
const postsContainer = document.getElementById('posts-container');

loadPostsBtn.addEventListener('click', async () => {
    postsContainer.innerHTML = 'Chargement des posts...'; // Message de chargement

    try {
        // 1. Utiliser Fetch API pour récupérer des données
        // L'API JSONPlaceholder fournit des données de posts factices.
        // On veut récupérer les 10 premiers posts.
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');

        // 2. Vérifier si la requête a réussi (statut HTTP 200 OK)
        if (!response.ok) {
            // Si la réponse n'est pas OK, lancer une erreur
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        // 3. Convertir la réponse en JSON
        const posts = await response.json();

        // 4. Afficher les données dans le DOM
        postsContainer.innerHTML = ''; // Vider le message de chargement

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
            postsContainer.appendChild(postCard);
        });

    } catch (error) {
        // 5. Gérer les erreurs (par exemple, problème de réseau, API non disponible)
        console.error('Erreur lors du chargement des posts :', error);
        postsContainer.innerHTML = `<p style="color: red;">Erreur lors du chargement des posts : ${error.message}</p>`;
    }
});


// --- PARTIE 2 : Persistance de la To-Do List avec localStorage ---

const persistentTaskForm = document.getElementById('persistent-task-form');
const persistentNewTaskInput = document.getElementById('persistent-new-task-input');
const persistentTaskList = document.getElementById('persistent-task-list');
const clearAllTasksBtn = document.getElementById('clear-all-tasks-btn');

// Clé pour stocker les tâches dans localStorage
const LOCAL_STORAGE_KEY = 'todoListTasks';

// Fonction pour charger les tâches depuis localStorage et les afficher
function loadTasks() {
    // 1. Récupérer les tâches stockées dans localStorage
    // localStorage.getItem(clé) retourne une chaîne de caractères ou null
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedTasks) {
        // 2. Parser la chaîne JSON en tableau JavaScript
        const tasks = JSON.parse(storedTasks);

        // 3. Pour chaque tâche, l'ajouter à la liste persistante
        tasks.forEach(task => addPersistentTaskToDOM(task.text, task.completed));
    }
}

// Fonction pour sauvegarder les tâches actuelles dans localStorage
function saveTasks() {
    // 1. Récupérer tous les éléments <li> de la liste des tâches
    const taskElements = persistentTaskList.querySelectorAll('li');
    const tasksToSave = [];

    // 2. Parcourir les éléments et créer un tableau d'objets (texte et statut complété)
    taskElements.forEach(taskElement => {
        tasksToSave.push({
            text: taskElement.firstChild.textContent, // Le texte est le premier nœud enfant (avant le bouton)
            completed: taskElement.classList.contains('completed')
        });
    });

    // 3. Convertir le tableau d'objets en chaîne JSON
    const tasksJSON = JSON.stringify(tasksToSave);

    // 4. Stocker la chaîne JSON dans localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, tasksJSON);
}

// Fonction pour ajouter une tâche persistante au DOM
function addPersistentTaskToDOM(taskText, isCompleted = false) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    if (isCompleted) {
        listItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function() {
        persistentTaskList.removeChild(listItem);
        saveTasks(); // Sauvegarder après suppression
    });

    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed');
        saveTasks(); // Sauvegarder après changement de statut
    });

    listItem.appendChild(deleteButton);
    persistentTaskList.appendChild(listItem);
}

// Gérer la soumission du formulaire pour ajouter une tâche persistante
persistentTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = persistentNewTaskInput.value.trim();

    if (taskText !== '') {
        addPersistentTaskToDOM(taskText);
        saveTasks(); // Sauvegarder après ajout
        persistentNewTaskInput.value = '';
    } else {
        alert('Veuillez entrer une tâche !');
    }
});

// Gérer le bouton "Effacer toutes les tâches"
clearAllTasksBtn.addEventListener('click', function() {
    if (confirm('Voulez-vous vraiment effacer toutes les tâches ?')) {
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Supprimer l'entrée de localStorage
        persistentTaskList.innerHTML = ''; // Vider la liste affichée dans le DOM
    }
});

// Charger les tâches au chargement de la page
document.addEventListener('DOMContentLoaded', loadTasks);