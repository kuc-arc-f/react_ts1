import React  from 'react';
import client from '../../apollo-client'
import Note from '../../graphql/note'
import LibNote from '../../lib/LibNote'

interface IObjectTag {
  name: string,
}
interface IProps {
  history: string[],
}
interface IState {
  id: number,
  title: string,
  content: string,
  arr_tags: string[],
  category: string[],
  noteTag: IObjectTag[],
}
//
 export default class NoteEdit extends React.Component<IProps, IState> {
  constructor(props:any) {
    super(props)
    const id = Number(props.match.params.id)
    const tags = LibNote.get_tags();  
    const category = LibNote.getCategory();
    this.state = {
      id: id, title: "", content: "", arr_tags: tags, category: category,
      noteTag: []
    };
  }
  async componentDidMount(){
    const data = await client.query({
      query: Note.get_query_item(this.state.id),fetchPolicy: "network-only"
    })
console.log(data.data)    
    const item = data.data.note;    
    this.setState({
      id: item.id, title: item.title, content: item.content,
      noteTag: item.noteTag,
    })
    if(item.category !== null){
      const elem = document.querySelector<HTMLInputElement>('#category');
      elem.value = item.category.name
    }
  }
  /* update */
  async clickHandler(){
    try{
      let noteId = 0;
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const category = document.querySelector<HTMLInputElement>('#category');      
      const arrTags: string[] = [];
      this.state.arr_tags.map((item, index) => {
        let elemName = "check_" + index;
        let element = document.querySelector<HTMLInputElement>('#' + elemName);
        if(element.checked){
          arrTags.push(item);
        }
      })    
  //console.log("clickHandler: " + title.value)
      let result = await client.mutate({
        mutation: Note.getUpdate(this.state.id, title.value, content.value)
      }) 
console.log(result)
      if(typeof result.data.noteUpdate.id === "number"){
        noteId = result.data.noteUpdate.id;
        console.log("noteId=", noteId);
      }else{
        alert("Error, note save");
        return;
      }
      // category
      result = await client.mutate({
        mutation: Note.getCategoryAdd(noteId, category.value)
      })    
//console.log(arrTags)
      for (const item of arrTags) {
        result = await client.mutate({
          mutation: Note.getNoteTagAdd(noteId, item)
        })
      }
      alert("Complete, update");
      this.props.history.push("/notes");
    } catch (e) {
      console.error(e);
      throw new Error('Error , delete_movie');
    }    
  }
  /* delete */
  async deleteHandler(){
    const result = await client.mutate({
      mutation: Note.getDelete(this.state.id)
    })
    console.log(result); 
    alert("Complete, delete");
    this.props.history.push("/notes");
  }
  tagsRow(){
    const self = this;
    const tags = this.state.arr_tags
    return tags.map((item, index) => {
//console.log(item )
      let name = "check_" + String(index)
      let lbl_name = String(item)
      let valid = self.valid_dispCheck(item, self.state.noteTag)
      if(valid){
        return(
        <div className="mt-2" key={index}>
          {lbl_name}
          <input type="checkbox" name={name} id={name} className="mx-2"
          defaultChecked={true} />          
        </div>
        )
      }else{
        return(
        <div className="mt-2" key={index}>
          {lbl_name}
          <input type="checkbox" name={name} id={name} className="mx-2"
            />         
        </div>
        )
      }
    })    
  }
  valid_dispCheck(value: string, items: IObjectTag[]){
    let ret = false
    items.map((item) => {
//console.log(value, item.name )
      if(item.name === value){
        ret = true
      }
    })    
    return ret
  }      
  render() {
    const category = this.state.category;
console.log(this.state.noteTag)
    return (
      <div className="container pt-1 pb-4">
        <h3>Note - Edit</h3>
        ID : {this.state.id}
        <hr />
        <div className="row">
          <div className="col-md-6">
            <label>Category :</label>
            <select id="category" name="category" className="form-control">
            {category.map((item, index) => {
//console.log(item.name)
              return(<option key={index}
                value={item}>{item}</option>)            
            })}                 
            </select>
          </div>
        </div>        
        <hr />
        <div className="form-group col-md-6 mt-2">
          <label>title:</label>
          <input type="text" name="title" id="title"
          defaultValue={this.state.title} /> 
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>content:</label>
            <input type="text" className="form-control" name="content" id="content"
            defaultValue={this.state.content} />
          </div>
        </div>
        <hr />
        {this.tagsRow()}
        <hr />
        <button onClick={() => {this.clickHandler()}}>
          UpdateTodo
        </button>   
        <hr />   
        <button onClick={() => {this.deleteHandler()}}>
          DeleteTodo
        </button>
        <hr className="mb-4"/>
      </div>
    );
  }
}

