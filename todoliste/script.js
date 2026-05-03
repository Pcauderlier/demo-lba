let popup = document.querySelector(".popup");

let todoList = [
    {
        id : 1,
        title : "test",
        description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum vero quod. Nostrum officiis ea voluptates quisquam animi. Non, doloremque! Laboriosam in nesciunt ducimus iusto a eaque blanditiis, libero at?",
        date : "2026-04-13"
    },
    {
        id : 2,
        title : "test2",
        description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum vero quod. Nostrum officiis ea voluptates quisquam animi. Non, doloremque! Laboriosam in nesciunt ducimus iusto a eaque blanditiis, libero at?",
        date : "2026-05-12"
    },
    {
        id : 3,
        title : "test3",
        description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum vero quod. Nostrum officiis ea voluptates quisquam animi. Non, doloremque! Laboriosam in nesciunt ducimus iusto a eaque blanditiis, libero at?",
        date : "2026-06-15"
    }
];


function getElemContent(id, parent = "create"){
    return document.querySelector(`#${parent} #${id}`).value
}

function formatDate(date){
    let split = date.split("-");
    return `${split[2]}/${split[1]}/${split[0]}`
}


function addElemToList(id,title, description, date){
    todoList.push({
        id : id,
        title : title,
        description :  description,
        date : date
    })
    renderTodo()
}

function renderTodo(){
    let todoElem = document.getElementById('todo');
    todoElem.innerHTML = "";
    if (todoList.length == 0){
        return;
    }
    for (let elem of todoList){
        let item = buildItemHtml(elem.title, elem.description, elem.date,elem.id);
        todoElem.appendChild(item);
    }
}

function buildItemHtml(title, description, date, id){
    let div = document.createElement('div');
    div.classList.add('todo-element');
    div.innerHTML = `
        <div class='title'>${title}</div>
        <div class='description'>${description}</div>
        <div class='date'>${formatDate(date)}</div>
        <div class='actions' data-itemId='${id}'>
            <button data-itemId='${id}' class="delete">Supprimer</button>
            <button class="modify">Modifier</button>
        </div>
    `
    div.querySelector(".delete").addEventListener("click", function(e){
        // console.log(e.target.getAttribute("data-itemId"))
        deleteItem(e)
    })
    div.querySelector(".modify").addEventListener("click", function(e){
        fillModifyForm(e)
    })

    return div
}

function findItemById(itemId){
    for (let item of todoList){
        if (item.id == itemId){
            return item
        }
    }
}

function getItemIdFromEvent(event){
    let actions = event.target.closest(".actions")
    return actions.getAttribute("data-itemId")
}

function fillModifyForm(event){
    let itemId = getItemIdFromEvent(event)
    let item = findItemById(itemId);
    popup.querySelector("#modify #title").value = item.title
    popup.querySelector("#modify #description").value = item.description
    popup.querySelector("#modify #date").value = item.date
    togglePopup()

    console.log(item)

}
function deleteItem(event){
    let itemId = getItemIdFromEvent(event)
    deleteItemFromList(itemId)

    console.log(itemId)
}

function deleteItemFromList(itemId){
    let newList = [];
    for(let i in todoList){
        if (todoList[i].id != itemId){
            newList.push(todoList[i])
        }
    }
    todoList = newList
    renderTodo();
}



document.querySelector("form#create").addEventListener('submit', function(e){
    e.preventDefault();
    let title = getElemContent('title')
    let description = getElemContent('description')
    let date = getElemContent('date')
    if (title == ""){
        alert("Le titre ne peut pas etre vide !")
        return;
    }
    let id = todoList.length+1
    addElemToList(id,title,description,date)

})
function togglePopup(){
    popup.classList.toggle("hidden")
}
document.querySelector(".popup .close").addEventListener("click", function(e){
    popup.classList.add("hidden")
})
renderTodo()