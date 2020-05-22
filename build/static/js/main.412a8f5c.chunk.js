(this.webpackJsonpscattergories=this.webpackJsonpscattergories||[]).push([[0],{15:function(e,t,n){},21:function(e,t,n){},51:function(e,t,n){e.exports=n(92)},85:function(e,t){},92:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(48),o=n.n(r),c=(n(15),n(21),n(1)),i=n(2),u=n(4),l=n(3),h=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("h1",null,this.props.letter),s.a.createElement("button",{onClick:function(){return e.props.handleClick()}},"Shuffle Letter"))}}]),n}(s.a.Component),m=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).shuffleLetter=function(){a.socket.emit("letter:shuffle")},a.socket=e.socket,a.state={letter:""},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("initial",(function(t){e.setState({letter:t.letter})})),this.socket.on("letter",(function(t){e.setState({letter:t.letter})}))}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(h,{letter:this.state.letter,handleClick:this.shuffleLetter}))}}]),n}(s.a.Component),p=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.props.state,n=t.running,a=t.time,r=t.ended;return s.a.createElement("div",null,s.a.createElement("h1",null,a),r?null:s.a.createElement("button",{onClick:function(){return e.props.handleClick()}},n?"Pause":"Start"),r?s.a.createElement("button",{onClick:function(){return e.props.handleRestart()}},"Restart"):s.a.createElement("button",{onClick:function(){return e.props.handleReset()}},"Reset"))}}]),n}(s.a.Component),f=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).setTimer=function(e,t){a.setState({time:e,running:t,ended:a.state.ended})},a.toggleTimer=function(){a.state.running&&a.socket.emit("timer:stop"),a.state.running||a.socket.emit("timer:start")},a.resetTimer=function(){a.socket.emit("timer:reset")},a.restartGame=function(){a.socket.emit("game:restart"),a.setState({time:a.state.time,running:a.state.running,ended:!1})},a.socket=e.socket,a.state={time:120,running:!1,ended:!1},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("initial",(function(t){e.setTimer(t.time,e.state.running)})),this.socket.on("time",(function(t){e.setTimer(t.time,t.running)})),this.socket.on("time:end",(function(){e.setState({time:e.state.time,running:!1,ended:!0})}))}},{key:"render",value:function(){return s.a.createElement(p,{state:this.state,handleClick:this.toggleTimer,handleReset:this.resetTimer,handleRestart:this.restartGame})}}]),n}(s.a.Component),d=n(13),w=n(7),b=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this.props.state.showCategories;return s.a.createElement("p",{className:e?"category-text":"category-text-hidden"},this.props.title)}}]),n}(s.a.Component),j=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return s.a.createElement("input",{className:this.props.showAnswers?"category-input":"category-input-hidden",value:this.props.value||"",onChange:function(t){return e.props.handleValue(t,e.props.i)}})}}]),n}(s.a.Component),O=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this.props.result||{};return s.a.createElement("div",null,Object.keys(e).map((function(t,n){return s.a.createElement("p",{key:"".concat(n,"result")},t,": ",e[t])})))}}]),n}(s.a.Component),k=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.props.state,n=t.categories,a=t.showAnswers,r=t.answers,o=t.results,c=t.end;return s.a.createElement("div",null,s.a.createElement("ol",null,s.a.createElement("button",{onClick:function(){return e.props.handleShuffle()}},"Shuffle Categories"),n.map((function(t,n){return s.a.createElement("li",{key:n},s.a.createElement("div",{className:"category-div"},s.a.createElement(b,{key:"".concat(n,"+++"),title:t,i:n,state:e.props.state}),c?s.a.createElement(O,{key:"".concat(n,"+"),result:o[n]}):s.a.createElement(j,{key:"".concat(n,"++"),i:n,value:r[n],handleValue:e.props.handleValue,showAnswers:a})))})),s.a.createElement("button",{onClick:function(){return e.props.handleShowAnswers()}},a?"Cover Answers":"Show Answers")))}}]),n}(s.a.Component),v=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).shuffleCategories=function(){a.socket.emit("categories:shuffle")},a.handleShowAnswers=function(){a.setState({showAnswers:!a.state.showAnswers,showCategories:a.state.showCategories,answers:Object(w.a)({},a.state.answers),categories:Object(d.a)(a.state.categories),end:a.state.end,results:Object(w.a)({},a.state.results)})},a.handleValue=function(e,t){var n=Object(w.a)({},a.state.answers);n[t]=e.target.value,a.setState({showAnswers:a.state.showAnswers,showCategories:a.state.showCategories,answers:n,categories:Object(d.a)(a.state.categories),end:a.state.end,results:Object(w.a)({},a.state.results)})},a.handleEnter=function(e,t){(console.log(e),console.log(a.refs),13===e.keyCode)&&(e.target.form.elements[t+1].focus(),e.preventDefault())},a.socket=e.socket,a.name=e.name,a.state={showAnswers:!0,showCategories:!1,answers:{},categories:[],end:!1,results:{}},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("initial",(function(t){e.setState({showAnswers:e.state.showAnswers,showCategories:e.state.showCategories,answers:Object(w.a)({},e.state.answers),categories:t.categories,end:e.state.end,results:Object(w.a)({},e.state.results)})})),this.socket.on("categories",(function(t){e.setState({showAnswers:e.state.showAnswers,showCategories:!1,answers:Object(w.a)({},e.state.answers),categories:t.categories,end:e.state.end,results:Object(w.a)({},e.state.results)})})),this.socket.on("time",(function(t){e.setState({showAnswers:e.state.showAnswers,showCategories:t.running,answers:Object(w.a)({},e.state.answers),categories:Object(d.a)(e.state.categories),end:e.state.end,results:Object(w.a)({},e.state.results)})})),this.socket.on("game:start",(function(){e.setState({showAnswers:!0,showCategories:!0,answers:{},categories:Object(d.a)(e.state.categories),end:!1,results:Object(w.a)({},e.state.results)})})),this.socket.on("time:end",(function(){e.setState({showAnswers:e.state.showAnswers,showCategories:!0,answers:Object(w.a)({},e.state.answers),categories:Object(d.a)(e.state.categories),end:e.state.end,results:Object(w.a)({},e.state.results)});for(var t=Object(w.a)({},e.state.answers),n=0;n<e.state.categories.length;n++)t[n]||(t[n]="");e.socket.emit("answers",{name:e.name,id:e.socket.id,answers:t})})),this.socket.on("answers:results",(function(t){e.setState({showAnswers:e.state.showAnswers,showCategories:e.state.showCategories,answers:Object(w.a)({},e.state.answers),categories:Object(d.a)(e.state.categories),end:!0,results:t})}))}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(k,{state:this.state,handleShuffle:this.shuffleCategories,handleShowAnswers:this.handleShowAnswers,handleValue:this.handleValue}))}}]),n}(s.a.Component),g=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this.props.players||[];return s.a.createElement("ul",null,e.map((function(e,t){return s.a.createElement("li",{key:"".concat(t,"player")},e)})))}}]),n}(s.a.Component),E=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).socket=e.socket,a.state={players:[]},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("initial",(function(t){e.setState({players:t.clients})}))}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h2",null,"Players"),s.a.createElement(g,{players:this.state.players}))}}]),n}(s.a.Component),C=n(49),y=n.n(C),S=n(5),A=y()("localhost:3001"),V=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={socket:{},name:"",redirect:!1},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this.props.location.name;e?(this.setState({socket:A,name:e,redirect:!1}),A.emit("join",e)):this.setState({socket:{},name:"",redirect:!0})}},{key:"render",value:function(){return this.state.redirect?s.a.createElement(S.a,{to:"/"}):s.a.createElement("div",null,s.a.createElement(m,{socket:A}),s.a.createElement(f,{socket:A}),s.a.createElement(v,{name:this.state.name,socket:A}),s.a.createElement(E,{socket:A}))}}]),n}(s.a.Component),R=n(17),T=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("button",{onClick:this.props.handleClose},"X"),s.a.createElement("h2",null,"Enter Name"),s.a.createElement("input",{value:this.props.input,onChange:function(t){return e.props.handleValue(t)}}),s.a.createElement(R.b,{to:{pathname:"/game",name:this.props.input}},"Go"))}}]),n}(s.a.Component),D=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).handleClose=function(){e.setState({show:!1,input:e.state.input})},e.handleShow=function(){e.setState({show:!0,input:e.state.input})},e.handleValue=function(t){e.setState({show:e.state.show,input:t.target.value})},e.state={show:!1,input:""},e}return Object(i.a)(n,[{key:"render",value:function(){return s.a.createElement("div",null,this.state.show?s.a.createElement(T,{input:this.state.input,handleValue:this.handleValue,handleClose:this.handleClose,handleShow:this.handleShow}):s.a.createElement("button",{onClick:this.handleShow},"Join Room"))}}]),n}(s.a.Component),M=function(){return s.a.createElement("div",null,s.a.createElement(R.a,null,s.a.createElement(S.b,{exact:!0,path:"/game",component:V}),s.a.createElement(S.b,{exact:!0,path:"/",component:D})))};o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(M,null)),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.412a8f5c.chunk.js.map