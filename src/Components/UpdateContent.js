import { Component } from "react";

class UpdateContent extends Component{
    //받은 프롭스값은 리드온니 라서 바꿀수 없음
    //따라서 해당 컴포넌트의 스테이트값으로 처리해서 사용
    constructor(props){
        super(props);
        this.state = {
            id : this.props.data.id,
            title : this.props.data.title,
            desc : this.props.data.desc
        }
        //함수 뒤에 바인드정의를 미리 정의 한후 사용 가능
        this.inputFormHandler = this.inputFormHandler.bind(this)
    }
    inputFormHandler(e){
        this.setState({
            //[]로 묶으면 현재 사용하는 태그의 이름을 확인할수있음
            [e.target.name] : e.target.value
        })
    }
    render(){
        return(
        <article>    
            <h2>Update</h2>
            <form action="/create_process" method="post"
                onSubmit={function(e){
                    e.preventDefault();
                    this.props.onSubmit(
                        this.state.id,
                        this.state.title,
                        this.state.desc);
                }.bind(this)}>

                <input type="hidden" name="id" value={this.state.id}></input>

                <p><input type="text" name="title"
                placeholder="title"
                value={this.state.title}
                //스테이트로 벨류값지정해도 값은 리드온리라서
                //onChange함수로 스테이트값을 변경해야함
                onChange={this.inputFormHandler}></input></p>
                <p><textarea name="desc" placeholder="description"
                 value={this.state.desc}
                 onChange={this.inputFormHandler}>
                    </textarea></p>
                <p>
                    <input type="submit"></input>
                </p>    
            </form>
        </article>    
        );
    }
}
  export default UpdateContent;