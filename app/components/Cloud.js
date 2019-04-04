import React, {Fragment} from 'react'

const Cloud = ({lexeme, clickClose, setPreferredWord}) => {

  return (
    <React.Fragment>
      <div className="cloud-wrapper">
        <a
          className="btn-floating white cloud-close"
          onClick={()=>clickClose(lexeme.id)}
        >
            <i className="black-text material-icons">clear</i>
        </a>


        <h4
          className="cloud-primary"
          onClick={()=>setPreferredWord({id: lexeme.id, word: lexeme.primary})}>
          {lexeme.primary}
        </h4>

        <div className="cloud-description"
          dangerouslySetInnerHTML={{ __html:lexeme.description }} >
        </div>


        <div>
          <ul className="cloud-suggestions">
            {lexeme.cloud.map((word, i)=>(
              <li
                key={`cloud-suggestion${i}`}
                >
                <a
                  href="#"
                  className="bg-fill"
                  onClick={()=>setPreferredWord({id: lexeme.id, word})}>
                  {word}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Cloud
