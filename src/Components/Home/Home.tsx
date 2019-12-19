import { Card, CardContent, CardHeader, Grid } from '@material-ui/core'
import { Container, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { FC, useEffect, useState } from 'react'

import { FirebaseService } from '../../firebase'
import RecipeImage from '../../img/pizza.jpg'
import { ReceipeDeleteDialog } from './ReceipeDeleteDialog'

export const imageStyle = { width: '100%' }
const useStyles = makeStyles(theme =>
    createStyles({
        home: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        kategorien: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    })
)

interface Recipe {
    Title: string
}

const Home: FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const classes = useStyles()
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogChange = () => setDialogOpen(prev => !prev)

    const handleAbort = () => {
        handleDialogChange()
    }

    const handleDelete = async () => {
        console.log('Test')
    }

    useEffect(() => {
        FirebaseService.firestore.collection('recipes').onSnapshot(querySnaphot => {
            setRecipes(querySnaphot.docs.map(doc => doc.data()) as Recipe[])
        })
    }, [])

    return (
        <Container className={classes.home}>
            <Grid container spacing={2} justify="center">
                {recipes.map(recipe => (
                    <Grid key={recipe.Title} item xs={12} md={6} lg={4}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <img src={RecipeImage} alt="RecipeImage" style={imageStyle} />
                                </Grid>
                                <Grid item xs={8}>
                                    <CardHeader title={recipe.Title} />
                                    <CardContent>Erstellt am 01.01.1970</CardContent>
                                    <ReceipeDeleteDialog
                                        open={dialogOpen}
                                        onDeleteAbort={handleAbort}
                                        onDeleConfirm={handleDelete}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Home
