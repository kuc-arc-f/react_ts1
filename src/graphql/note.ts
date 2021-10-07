
import { gql} from '@apollo/client';

const note = {
  get_gql_add : function(title: string, content: string){
    return gql`
      mutation {
        noteAdd(title: "${title}", content: "${content}"){
          id
        }
      }                  
    `   
  },
  getNoteTagAdd : function(noteId: number, name: string){
    return gql`
      mutation {
        noteTagAdd(noteId: ${noteId}, name: "${name}"){
          id
        }
      }  
    `   
  },
  getCategoryAdd : function(noteId: number, name: string){
    return gql`
      mutation {
        categoryAdd(noteId: ${noteId}, name: "${name}"){
          id
        }
      }        
    `   
  },  
  get_query_item : function(id: number){
    return gql`
    query {
      note(id: ${id}) {
        id
        title
        content
        noteTag{
          id
          name
        }
        category{
          id
          name
        }            
      }
    }
   `   
  },
  getUpdate : function(id: number, title: string, content: string){
    return gql`
      mutation {
        noteUpdate(id: ${id}, title: "${title}", content: "${content}"){
          id
        }
      }
    `   
  },
  getDelete: function(id: number){
    return gql`
      mutation {
        noteDelete(id: ${id}){
          id
        }
      }            
    `   
  },      
}
export default  note;

