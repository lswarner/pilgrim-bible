import React from 'react'
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'
/*
Collections
-Collection [] //advent B, acts,
--section []    //advent 1B, Church in Jerusalem
----passage []    //advent1b-gospel, acts-peter-cornelious
*/


const Main = ({books, lectionary}) => (
  <div className="home-container">



      <h2>Lectionary</h2>
      { lectionary.map( (collection, i)=> (
        <Collection key={i} collection={collection}>
        </Collection>
      )) }

      <h2>Books</h2>
      <em>coming soon . . .</em>
      <h2>&nbsp;</h2><h2>&nbsp;</h2>
      {/*

        { books.map( (collection, i)=> (
          <Collection key={i} collection={collection}>
          </Collection>
        )) }
      */ }

  </div>
)

Main.propTypes= {
  books: PropTypes.array.isRequired,
  lectionary: PropTypes.array
}



const Collection = ({collection}) =>(
  <React.Fragment>
    <h3 className="collection-title">
      {collection.title}
    </h3>

    {collection.sections.map( (section, i) => (
      <Section key={i} section={section}></Section>
    ))}
  </React.Fragment>
)

Collection.propTypes= {
  collection: PropTypes.object.isRequired
}




const Section = ({section}) =>(
  <React.Fragment>
    <div className="row section" >
      <div className="pb-column md1">
        <h4 className="section-name">{section.name}</h4>
      </div>

      <div className="pb-column md2">
        <ul>
        { section.passages.map( (passage) => (
            <li key={passage.slug}>
              <Link to={{
                pathname: `/passage/${passage.slug}`
                //pathname: 'luke/postdeath'
                }}
              >
                {passage.title}
              </Link>
            </li>
          )
        )}
        </ul>
      </div>
    </div>
  </React.Fragment>
)

Section.propTypes={
  section: PropTypes.object.isRequired
}


export default Main;
