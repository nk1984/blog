

class AppPanel extends HTMLElement {
	
	constructor() {
		super();
		this.template = document.createElement('template');
		this.template.innerHTML = `
			<div>
				<section>
					<slot name="body"><div>Body</div></slot>
				</section>
				<section>
					<slot></slot>
				</section>
			</div>
		`;
		this.data = [
			{id:1001, name: 'Nirbhai Kaur' },
			{id:1002, name: 'Sharan Kaur' },
			{id:1003, name: 'Manjeet Kaur' },
			{id:1004, name: 'Harpreet Kaur' },
			{id:1005, name: 'Tejvir Kaur' }
		]
	}

	getItems() {

	}

	addItem(me) {
		
		let name = this.shadowRoot.querySelector(`#input_name`).value;
		if (name && me.textContent) {

			if (me.textContent.toLowerCase() === 'add') {
				this.data.push({id: (+this.data[this.data.length -1].id + 1), name: name});
				this.render();
			} else if (me.textContent.toLowerCase() === 'edit'){
				let index = this.data.findIndex(item=>item.id===this.editId)
				if (index > -1) {
					this.data[index].name = name;
					this.shadowRoot.querySelector(`#button_action`).textContent = 'Add';
					this.render();
				}
				
			}
			
		}
	}

	editItem(id, name) {
		this.editId = id;
		this.shadowRoot.querySelector(`#input_name`).value = name;
		this.shadowRoot.querySelector(`#button_action`).textContent = 'Edit';
	}

	deleteItem(id) {
		let index = this.data.findIndex(item=>item.id===id)
		this.data.splice(index, 1);
		this.render();
	}

	static get observedAttributes() { // (3)
		return ['data-updatedAt'];
	}
	
	attributeChangedCallback(name, oldValue, newValue) { // (4)
		this.render();
	}

	connectedCallback() {
		window.data = this.getAttribute('data');
		this.attachShadow({mode: 'open'});
		this.render();
		
	}

	render() {
		this.shadowRoot.innerHTML = `
		<style>
			.data-panel-body {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}
			.data-panel-body button {
				color: #047aed;
				background: white;
				box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
				border:none;
				outline: solid 2px #047aed;
				margin:.5rem;
				width: 70px;
			}

			.data-panel:hover button {
				background: #047aed;
				color: white;
				box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
				border:none;
				outline: solid 2px white;
				margin:.5rem;
				width: 70px;
			}

			.data-panel:hover {
				opacity:1;
				transform: scaleY(1.020);
				background: #047aed;
				color: white;
				border: solid 1px #fff;
				border-left: solid 5px #047aed;
			}
			.data-panel {
				color: #047aed;
				opacity:.8;
				background: white;
				border: solid 1px #047aed;
				padding: 1rem;
				margin: 1rem;
				border: solid 1px #047aed;
				border-left: solid 5px #047aed;
				box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
				font: italic small-caps bold 1rem/1.4rem Helvetica;
				flex: 1 1 300px;
				flex: 0 1 300px;
				transform: scale(1,1);
			}

			.add-data-panel {
				background: #047aed90;
				color: white;
				border: solid 1px #047aed;
				padding: 1rem;
				margin: 1rem;
				border: solid 1px #047aed;
				border-left: solid 5px #047aed;
				box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
				font: italic small-caps bold 1rem/1.4rem Helvetica;
				flex: 1 1 300px;
				flex: 0 1 300px;
			}
		</style>
		<div>
			<section>
				<slot name="body">
					<div class="add-data-panel">
						<h1>USER FORM</h1>
						<div>
							<div><label style="display:inline-block;width:100px;">Name</label><input id="input_name" name="input_name" style="font: italic small-caps bold 1rem/1.2rem Helvetica" type="text"/></div>
							<div><button id="button_action" style="margin: 10px 100px;width:100px;font: italic small-caps bold 1rem/1.2rem Helvetica" onclick="document.querySelector('app-panel').addItem(this)">Add</button></div>
						</div>
					</div>
					<div class="data-panel-body">
						${this.data.slice().reverse().map(obj=>`
							<div class="data-panel">
								<div>
									<div>${obj.id}</div>
									<div>${obj.name}</div>
								</div>
								<div>
									<button onclick="document.querySelector('app-panel').editItem(${obj.id}, '${obj.name}')">Edit</button>
									<button onclick="document.querySelector('app-panel').deleteItem(${obj.id}, '${obj.name}')">Delete</button>
								</div>
							</div>`).join('')
						}
					</div>
				</slot>	
			</section>
			<section>
				<slot></slot>
			</section>
		</div>
		`;
	}
}
window.customElements.define('app-panel', AppPanel);