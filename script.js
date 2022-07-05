const listValue = document.getElementById('list-value');
const addList = document.getElementById('add-list');
const listContainer = document.getElementById('list-container');
const localitem = [];
let id = 0;



const checkValue = function() {
	if(listValue.value == "") {
		listValue.placeholder = 'Пожалуйста введите что нибудь ....';
		return false
	}

	else {
		return true;
	}
}

const removeItem = function(event) {
	const parent = event.target.parentElement;

	localStorage.removeItem(parent.dataset.target);
	parent.remove();
}


function editValue(event) {
	const input = event.target.previousElementSibling;
	event.target.textContent = 'Сохранить';
	input.removeAttribute('readonly');
	input.focus();

		
	event.target.addEventListener('click', function(e) {
		if(input.value) {
			input.setAttribute('readonly', 'readonly');
			e.target.textContent = 'Редактировать';
		}

		else {
			input.setAttribute('placeholder', 'поле пустое');
		}

	})

}


const keyboardAddItem = function(event) {
	if(checkValue()) {
		if(event.code === 'Enter') {
		addItem();
		}
	}
	
}

const checkItem = function(event) {
	event.target.children[0].classList.toggle('active');
	event.target.children[1].classList.toggle('active');
}

const showItem = function() {
	const keys = Object.keys(localStorage);
	let item = 1
    for(item of keys) {
    	addItem(localStorage.getItem(item));
    }
}

const addItem = function(template) {
	if(checkValue()) {
		const position = 'afterbegin';
		template = `
		<div class="list-item" id="list-item" data-target="${++id}">
			<i class="fa-solid fa-circle-notch"></i>
			<input class="list-item-text" id="list-item-text" type="text" readonly="readonly" value="${listValue.value}">
			<button class="btn list-item-edit" id="list-item-edit">Редактировать</button>
			<button class="btn list-item-remove" id="list-item-remove">Удалить</button>
		</div>
		`;

		

		listContainer.insertAdjacentHTML(position, template);
		listValue.value = '';
		listValue.placeholder = "Add new task";
		// const listItem = document.getElementById('list-item');
		// listItem.addEventListener('click', checkItem);
		const btnEdit = document.getElementById('list-item-edit');
		btnEdit.addEventListener('click', editValue);
		localStorage.setItem(`${id}`, template);
		const btnRemove = document.getElementById('list-item-remove');
		btnRemove.addEventListener('click', removeItem);
		
	}

	else {
		listContainer.insertAdjacentHTML('afterbegin', template);
		const btnEdit = document.getElementById('list-item-edit');
		btnEdit.addEventListener('click', editValue);
		localStorage.setItem(`${id}`, template);
		const btnRemove = document.getElementById('list-item-remove');
		btnRemove.addEventListener('click', removeItem);
	}
	
}

document.body.addEventListener('keyup', keyboardAddItem);

addList.addEventListener('click', addItem);


document.addEventListener("DOMContentLoaded", showItem);