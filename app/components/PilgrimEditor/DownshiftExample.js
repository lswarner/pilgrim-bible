import React from 'react'
import Downshift from 'downshift'

const items= [
  {id: 1, primary: 'exousia', traditional: 'authority'},
  {id: 2, primary: 'self-separation', traditional: 'sin'},
  {id: 3, primary: 'Unseen Kingdom', traditional: 'Kingdom of God'},
  {id: 4, primary: 'metanoia', traditional: 'repent'}
]

export default class DownShiftExample extends React.Component {

    constructor(props){
      super(props)
      //this.textInput= React.createRef()
    }
    componentDidMount(){
      //this.textInput.current.focus()
    }
    render() {
      return (
        <Downshift
          onChange={selection => {
            this.props.changeLexeme(selection.traditional)
            //alert(`You selected ${selection.traditional}`)
          }}
          itemToString={item => (item ? item.primary : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div>
              <label {...getLabelProps()}>Choose a lexeme</label>
              <input
                {...getInputProps()}
                //ref={this.textInput}
              />
              <ul {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(item => !inputValue || item.primary.includes(inputValue) || item.traditional.includes(inputValue))
                      .map((item,index)=>(
                        <li
                          {...getItemProps({
                            key: item.id,
                            index,
                            item,
                            style: {
                              backgroundColor: highlightedIndex === index ? 'lightgray' : null,
                              fontWeight: selectedItem === item ? 'bold' : 'normal'
                            },
                          })}
                        >
                          <em>{item.primary}</em>: {item.traditional}
                        </li>
                      ))
                  : null
                }
              </ul>
            </div>
          )}
        </Downshift>
      )
    }
}
