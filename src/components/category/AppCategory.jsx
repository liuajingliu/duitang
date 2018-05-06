import React, { Component } from 'react'
import {Link, hashHistory} from 'react-router'
import axios from 'axios'

class AppCategory extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      list: []
    }
 }
  componentWillMount () {
    axios.get('ky/napi/index/groups/', {
      params: {
        app_version: 14,
        app_code: 'mdt'
      }
    })
    .then(res =>{
      this.setState({data: res.data.data[0].group_items})
      this.setState({list: res.data.data})
      console.log(this.state.data,999)
      console.log(this.state.list)
    })
  }

  render () {      
    let list = this.state.list.slice(1,7)
    console.log(this.props.location.query)
    console.log(list)
    return (
      <div>
        <section id="content">
          <div className="top">
                          
              {
                 this.state.data?<div className="item-box">
                  {
                   this.state.data.map((item,i) =>(
                      
                      <div key={i} className="top-item"> 
                        {
                          i===1?<Link to={'appshop'}><span></span>{item.name}</Link>:
                            <Link to={`applist/${item.target.split('?')[1].split('=')[1]}`}><span></span>{item.name}</Link>
                        }
                      </div>                     
                    ))
                  }
                </div> :'' 
              }            
          </div>
          <div className="bottom">
            {
              list?(list.map((item,i) => { 
                return (
                  <div key={i}className="bottom-box">
                  {
                    item.group_items.map((ele,index) => {
                        return (
                          <div key={index} className="bottom-item">
                            <Link to={`applist/${ele.target.split('?')[1].split('=')[1]}`}><span></span>{ele.name}</Link>
                          </div>
                        )
                    })
                  }
                  </div>
                )
              })):''
            }
          </div>
        </section>
      </div>
    )
  }
}

export default AppCategory


// {ele.target.split('?')[1]}

// {`/bloglist/:${ele.target.split('?')[1]}`}