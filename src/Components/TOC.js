// function TOC (){
//     return(
//       <nav>
//         <li><a href='1.html'>HTML</a></li>
//         <li><a href='2.html'>CSS</a></li>
//         <li><a href='3.html'>JavaScript</a></li>
//       </nav>
//     );
//   }

import { Component } from "react";
 
class TOC extends Component{

    shouldComponentUpdate(newProps, newState){
        console.log(newProps.data, this.props.data)
        if(newProps.data === this.props.data){
            return false;
        }
        return true;
    }
      render(){
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length){
            lists.push(
                <li key={data[i].id}>
                    <a 
                    href={"/content/"+data[i].id}
                    data-id = {data[i].id}
                    onClick={function(e){
                        e.preventDefault();
                        this.props.onChangePage(e.target.dataset.id);
                    }.bind(this)}
                    >
                    {data[i].title}</a>
                </li>
            )
            i = i + 1;
        }
        return(
          <nav>
           {lists}
         </nav>
        );
      }
  }  

  export default TOC;