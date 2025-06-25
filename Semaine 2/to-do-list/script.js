// PARTIE 1 : Sélection des éléments du DOM
const taskForm = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task-input');
const taskList = document.getElementById('task-list');


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
        tasks.forEach(task => addTask(task.text, task.completed));
    }
}

// Fonction pour sauvegarder les tâches actuelles dans localStorage
function saveTasks() {
    // 1. Récupérer tous les éléments <li> de la liste des tâches
    const taskElements = taskList.querySelectorAll('li');
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
//////////////////////////////
// PARTIE 2 : Fonction pour ajouter une tâche
// Cette fonction prend en paramètre le texte de la tâche et crée un nouvel élément <li>
function addTask(taskText, isCompleted = false) {
    // 1. Créer un nouvel élément <li>
    const listItem = document.createElement('li');
    listItem.textContent = taskText; // Ajouter le texte de la tâche

    if (isCompleted){
        listItem.classList('completed');
    }

const editButton = document.createElement('button');
editButton.textContent = 'Modifier';
editButton.classList.add('edit-btn');
editButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Ne pas cocher la tâche

    // Remplit le champ input avec le texte de la tâche
    newTaskInput.value = listItem.firstChild.textContent;

    // Mémorise la tâche sélectionnée
    taskToEdit = listItem;
});

    // 2. Ajouter un bouton de suppression à l'élément <li>
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('delete-btn'); // Ajouter une classe pour le style
    // 3. Ajouter un écouteur d'événement 'click' au bouton de suppression
    // Quand on clique, cela doit supprimer le parent (l'élément <li>)
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem); // Supprime l'élément <li> de la liste
        saveTasks();

    });

    // 4. Ajouter un écouteur d'événement 'click' à l'élément <li> lui-même
    // Quand on clique sur la tâche, cela doit alterner la classe 'completed'
    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed'); // Ajoute ou supprime la classe 'completed'
        saveTasks();

    });
    listItem.appendChild(editButton);

    // 5. Ajouter le bouton de suppression à l'élément <li>
    listItem.appendChild(deleteButton);
    // 6. Ajouter le nouvel élément <li> à la liste des tâches (<ul>)
    taskList.appendChild(listItem);

        saveTasks();

}

// PARTIE 3 : Gérer l'événement de soumission du formulaire
// Ajouter un écouteur d'événement 'submit' au formulaire
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();// Empêcher le rechargement de la page par défaut du formulaire
    const taskText = newTaskInput.value.trim(); // .trim() pour enlever les espaces inutiles
    // 2. Vérifier si l'input n'est pas vide

    if (taskText === '') {
        alert('Veuillez entrer une tâche !');
        return;
    }

    if (taskToEdit) {
        // Modifier l'ancien texte de la tâche
        taskToEdit.firstChild.textContent = taskText;
        taskToEdit = null;
    } else {
        // Ajouter une nouvelle tâche
        addTask(taskText);
    }

    newTaskInput.value = '';
    saveTasks();
});

document.addEventListener('DOMContentLoaded', loadTasks);










