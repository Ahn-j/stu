import './App.css';
import TOC from './Components/TOC';
import ReadContent from './Components/ReadContent';
import Subject from './Components/Subject';
import Control from './Components/Control';
import React ,{ Component } from "react";
import CreateContent from './Components/CreateContent';
import UpdateContent from './Components/UpdateContent';


// function App() {

//   return (
//     <div className="App">
//       <Subject title="WEB" sub="World Wide Web!!"></Subject>
//       <TOC></TOC>
//       <Content title="HTML" desc="HTML is Hypertext Markup Language!!"></Content>
//     </div>
//   );
// }

class App extends Component{

  constructor(props){
    super(props);
    //UI에 영향이없는 값일경우 스테이트값으로 주지않고, 별도로 작성함
    //이유는 불필요한 렌더링을 피하기위해서
    this.max_content_id=3;
    this.state = {
      mode : "welcome",
      selected_content_id:0,
      subject : {
        title:"WEB" , sub:"World Wide Web!!"
      },
      welcome : {title:"welcome" , desc:"Hello, React!!!"},
      contents :[
        {id:1 , title:"HTML" , desc:"HTML is fir information"},
        {id:2 , title:"CSS" , desc:"CSS is for design"},
        {id:3 , title:"JavaScript" , desc:"JavaScript is for interaction"}
      ]
    }
  }

  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i = i+1;
      }
  }

  getContent(){

    var _title,_desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent 
      title={_title} 
      desc={_desc}>
    </ReadContent>
    }else if(this.state.mode === "read"){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} 
      desc={_content.desc}>
    </ReadContent>
    }else if(this.state.mode === "create"){
      _article = <CreateContent
        onSubmit={function(_title, _desc){
          //서브밋 버튼 눌렀을떼 TOC에 추가하는 코드ß
          this.max_content_id = this.max_content_id+1;
          //push는 원본을 변경
          //concat은 원본은 유지하며 새로운 복제한값을 리턴시킴
          //immutate 불변 , 배열인 경우 Array.from사용, 객체인 경우 object.assign({},a)사용 첫번쩨인자는 빈객체로 두번째인자 a를 복사하여 첫번째인자로 넘김
          var _contents = this.state.contents.concat(
            {id:this.max_content_id , title:_title, desc:_desc}
          );
          this.setState({
            contents:_contents,
            mode:"read",
            selected_content_id:this.max_content_id
          })
        }.bind(this)}
      ></CreateContent>

    }else if(this.state.mode === "update"){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content}
        onSubmit={function(_id,_title, _desc){
          var _contents = Array.from(this.state.contents)
          var i = 0; 
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc}
              break;
            }
            i=i+1;
          }
          this.setState({
            contents:_contents,
            mode: "read"
          })
        }.bind(this)}
      ></UpdateContent>

    }
    return _article;
  }
  render(){
    
      return(
        <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode:"welcome"
            });
          }.bind(this)}
          >
        </Subject>
        <TOC
          onChangePage={
            function(id){
              this.setState({
                mode:"read",
                selected_content_id:Number(id)
              });
            }.bind(this)
          }
          data={this.state.contents}>
        </TOC>
        <Control onChangeMode={
          function(_mode){
            if(_mode === "delete"){
              if(window.confirm("really_?")){
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i < this.state.contents.length){
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i,1);
                    break;
                  }
                  i = i +1;
                }
                this.setState({
                  mode:"welcome",
                  contents:_contents
                })
                alert("削除しました。");
              }
            }else{
              this.setState({
                mode: _mode
              })  
            }
            
          }.bind(this)
        }></Control>
        {this.getContent()}
      </div>
      );
  }
}

export default App;