import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './App.css';
 
import UniqueId from 'react-html-id';


class TDLPage extends Component {
  constructor(props){
    super(props);
    UniqueId.enableUniqueIds(this);
    this.state={ 
      edit: false,
      todoList: [
       {id:this.nextUniqueId(), stuff2do: 'Walk the dog'},
       {id:this.nextUniqueId(), stuff2do: 'Pick up laundry'},
       {id:this.nextUniqueId(), stuff2do: 'Go grocery shopping'},
       {id:this.nextUniqueId(), stuff2do: 'Clean the room'},
       {id:this.nextUniqueId(), stuff2do: 'Cook the meal'}
      ]
     };
     

  }
//--------------------------add Task ----------------------------------------------------
onSubmitHandle(event){
  event.preventDefault();
  if(event.target.element.value!==""){ 
  this.setState({
    todoList:[...this.state.todoList,{
     id: Date.now(),
      stuff2do:event.target.element.value,
    }]
  });}
  console.log(this.state);

}
//--------------------------Delete function ---------------------------------------------
  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      todoList: this.state.todoList.filter(todoList => {
        if (todoList.id !== id) {
          return todoList;
        }
      })
    });
  }
//--------------------------Edit Task --------------------------------------------------
  onEditHandle() {
    this.setState({ 
      edit: true,
      id: arguments[0],
      stuff2do: arguments[1]
    });
}
//-----------  handle the update values ----------- 
onUpdateHandle(event) {
  event.preventDefault();
  this.setState({
    todoList: this.state.todoList.map(item => {
      if (item.id === this.state.id) {
        item['stuff2do'] = event.target.updatedItem.value;
        return item;
      }
      return item;
    })
  });
  this.setState({
    edit: false
  });
}

renderEditForm() {
  if (this.state.edit) {
    return <form onSubmit={this.onUpdateHandle.bind(this)}>
      <input type="text" name="updatedItem" className="item" defaultValue={this.state.stuff2do} />
      <button className="update-add-item">Update</button>
    </form>
  }
}
renderAddForm(){
  if(!this.state.edit){
    return <form onSubmit={this.onSubmitHandle.bind(this)}>
    <input type="text" name="element" className="element" placeholder="things to do be done..." />
    <button className="add_element">Add</button>
  </form>
  }
}

//-----------------------------Render Page-----------------------------------------------
  render() {
    return (
    <div>
      <h2>To Do List</h2> 
   
          {this.renderEditForm()}
          {this.renderAddForm()}
      
      <ul>
      {this.state.todoList.map(item => (
        <li key = {item.id} >
          {item.stuff2do}
          <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
          <button onClick={this.onEditHandle.bind(this, item.id, item.stuff2do)}>Edit</button>

        </li>
      ))}
      </ul>   
    </div>
  );
  }
}
//--------------------------routing page---------------------------------------------

class Home extends Component {
  render() {return <div><h2>Home Page</h2><p>This an empty home page!</p></div>;}
}

class Contact extends Component {
  render() {return <div><h2>Contact Page</h2><p>This an empty contact page!</p></div>;}
}

class About extends Component {
  render() {return <div><h2>About Page</h2><p>This an empty about page!</p></div>;}
}
//---------------------------------------------------------------------------------- 

class App extends Component {
  render ()
  {
    return (
    <div>
     <h1>A10 To Do List</h1>
     <Router>

       <NavLink exact to="/">Home</NavLink> <br />       
       <NavLink to="/About">About</NavLink> <br />
       <NavLink to="/Contact">Contact</NavLink> <br />
       <NavLink to="/TDL">TODO</NavLink> <br />

       <Route exact path="/" component={Home} />
       <Route path="/TDL" component={TDLPage} />
       <Route path="/about" component={About} />
       <Route path="/contact" component={Contact} />


     </Router>
    </div>
    );
  }
}

export default App;
