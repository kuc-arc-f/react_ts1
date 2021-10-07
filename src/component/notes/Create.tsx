import React  from 'react';
import client from '../../apollo-client'
import Note from '../../graphql/note'
import LibCookie from '../../lib/LibCookie'
import LibConfig from '../../lib/LibConfig'
import LibNote from '../../lib/LibNote'

interface IProps {
  history: string[],
}
interface IState {
  title: string,
  content: string,
  arr_tags: string[],
  category: string[],
}
//
export default class TaskCreate extends React.Component<IProps, IState> {
  constructor(props: any){
    super(props)
    const tags = LibNote.get_tags();  
    const category = LibNote.getCategory();  
    this.state = {
      title: '', content: '', arr_tags: tags, category: category
    }    
  }
  componentDidMount(){
    const key = LibConfig.getConfig().COOKIE_KEY_UID;
    if(LibCookie.get_cookie(key) === null){
      this.props.history.push("/login");
    }
  }  
  async clickHandler(){
    try {
      let noteId = 0;
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const category = document.querySelector<HTMLInputElement>('#category');
      const arrTags: string[] = [];
      this.state.arr_tags.map((item, index) => {
        let elemName = "check_" + index;
        let element = document.querySelector<HTMLInputElement>('#'+ elemName);
        if(element.checked){
          arrTags.push(item);
        }
      }) 
console.log(arrTags);
      let result = await client.mutate({
        mutation: Note.get_gql_add(title.value, content.value)
      })
      if(typeof result.data.noteAdd.id === "number"){
        noteId = result.data.noteAdd.id;
//console.log("noteId=", noteId);
      }else{
        alert("Error, note save");
        return;
      }
      // Category
//console.log( "c=", category.value);
      result = await client.mutate({
        mutation: Note.getCategoryAdd(noteId, category.value)
      })
      //noteTag
      for (const item of arrTags) {
        result = await client.mutate({
          mutation: Note.getNoteTagAdd(noteId, item)
        })
      }     
      alert("Success, save");
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }    
  }
  tagsRow(){
    const tags = this.state.arr_tags
//console.log(tags)
    return tags.map((item, index) => {
//console.log(item )
      let name = "check_" + String(index)
      let lbl_name = String(item)
      return(
        <div className="mt-2" key={index}>
          {lbl_name}
          <input type="checkbox" name={name} id={name} className="mx-2"
          />         
        </div>
      )
    })    
  }  
  render(){
//    console.log(this.state.arr_tags);
    const category = this.state.category;
    return (
      <div className="container py-2">
        <h3>Note - Create</h3>
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
        <div className="row">
          <div className="col-md-6">
            <label>Title:</label>
            <input type="text" className="form-control" name="title" id="title"
              />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>content:</label>
            <input type="text" className="form-control" name="content" id="content"
              />
          </div>
        </div>
        <hr />
        Tag:<br />
        {this.tagsRow()}
        <hr />
        <button onClick={() => {this.clickHandler()}}>
          Add
        </button>      
        <hr />
      </div>
      );
  }
}
