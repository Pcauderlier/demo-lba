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
    for (let i = 0; i < todoList.length; i++){
        let elem = todoList[i];
        let item = buildItemHtml(elem.title, elem.description, elem.date, elem.id, i, todoList.length);
        todoElem.appendChild(item);
    }
}

function buildItemHtml(title, description, date, id, index, total){
    let div = document.createElement('div');
    div.classList.add('todo-element');
    div.innerHTML = `
        <div class="todo-reorder" data-itemId="${id}">
            <button type="button" class="move-up" ${index === 0 ? 'disabled' : ''}>⬆️</button>
            <button type="button" class="move-down" ${index === total - 1 ? 'disabled' : ''}>⬇️</button>
        </div>
        <div class='title'>${title}</div>
        <div class='description'>${description}</div>
        <div class='date'>${formatDate(date)}</div>
        <div class='actions' data-itemId='${id}'>
            <button data-itemId='${id}' class="delete">Supprimer</button>
            <button class="modify">Modifier</button>
        </div>
    `
    div.querySelector(".delete").addEventListener("click", function(e){
        deleteItem(e)
    })
    div.querySelector(".modify").addEventListener("click", function(e){
        fillModifyForm(e)
    })
    div.querySelector(".move-up").addEventListener("click", function(e){
        moveItemUp(e)
    })
    div.querySelector(".move-down").addEventListener("click", function(e){
        moveItemDown(e)
    })

    return div
}

function moveItemUp(event){
    let itemId = event.target.closest(".todo-reorder").getAttribute("data-itemId")
    let search = findItemById(itemId, true)
    if (!search) return
    let i = search.index
    if (i <= 0) return
    let itemMovingUp = todoList[i]
    let itemAbove = todoList[i - 1]
    todoList[i - 1] = itemMovingUp
    todoList[i] = itemAbove
    renderTodo()
}

function moveItemDown(event){
    let itemId = event.target.closest(".todo-reorder").getAttribute("data-itemId")
    let search = findItemById(itemId, true)
    if (!search) return
    let i = search.index
    if (i >= todoList.length - 1) return
    let itemMovingDown = todoList[i]
    let itemBelow = todoList[i + 1]
    todoList[i] = itemBelow
    todoList[i + 1] = itemMovingDown
    renderTodo()
}

function findItemById(itemId,returnIndex = false){
    for (let index in todoList){
        let item = todoList[index]
        if (item.id == itemId){
            if (returnIndex){
                return {index: index, item: item}
            }
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
    popup.querySelector("#modify #itemId").value = item.id
    togglePopup()
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

document.querySelector("form#modify").addEventListener('submit', function(e){
    e.preventDefault();
    let search = findItemById(getElemContent('itemId','modify'), true)
    let item = search.item
    item.title = getElemContent('title','modify')
    item.description = getElemContent('description','modify')
    item.date = getElemContent('date','modify')
    todoList[search.index] = item
    renderTodo()
    togglePopup()
    
})
function togglePopup(){
    popup.classList.toggle("hidden")
}
document.querySelector(".popup .close").addEventListener("click", function(e){
    popup.classList.add("hidden")
})
renderTodo()