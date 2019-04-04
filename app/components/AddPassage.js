import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px`
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
});

const collectionTypes = [
  {
    value: 'book',
    label: 'Bible',
  },
  {
    value: 'lectionary',
    label: 'Lectionary',
  },
];

const AddPassage = ({changeChapter, changeVerses, classes}) => {


  return (
    <Fragment>
      <h1>Add a new passage</h1>
      <Formik
        initialValues={{
          collectionType: '',
          chapter: '',
          verses: '',
          title: '',
          content: ''
        }}
        onSubmit={ (values, actions)=>{
          console.log(JSON.stringify(values, null, 2))
          actions.setSubmitting(true)
          setTimeout( ()=>{
            actions.setSubmitting(false)
          }, 4000)
        }}
        render={ props => (


          <form className={classes.container} onSubmit={props.handleSubmit}>

            <Grid container spacing={24}>

                <Grid item xs={12}>
                  <TextField
                    id='collectionType'
                    name='collectionType'
                    label='Collection'
                    onChange={props.handleChange}
                    value={props.values.collectionType}
                    className={classes.textField}
                    margin='normal'
                    select
                    SelectProps={{
                      MenuProps:{
                        className: classes.menu
                      }
                    }}
                  >
                    {collectionTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>


                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="chapter"
                    name="chapter"
                    label="Chapter"
                    helperText="ex: 17"
                    onChange={props.handleChange}
                    value={props.values.chapter}
                    className={classes.textField}
                    margin='normal'
                  />

                  <TextField
                    id="verses"
                    name="verses"
                    label="Verses"
                    helperText="ex: 11-22"
                    onChange={props.handleChange}
                    vale={props.values.verses}
                    className={classes.textField}
                    margin='normal'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    onChange={props.handleChange}
                    value={props.values.title}
                    className={classes.textField}
                    margin='normal'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id='content'
                    name='content'
                    label='Content'
                    onChange={props.handleChange}
                    value={props.values.content}
                    className={classes.textArea}
                    multiline
                    rows='6'
                    margin='normal'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    margin='normal'
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
            </Grid>
          </form>

        )}
      />


    </Fragment>
  )

}

AddPassage.propTypes= {
  changeChapter: PropTypes.func.isRequired,
  changeVerses: PropTypes.func.isRequired
}

export default withStyles(styles)(AddPassage)
